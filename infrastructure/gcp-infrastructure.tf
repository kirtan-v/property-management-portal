# gcp-infrastructure.tf

provider "google" {
  project = var.project_id
  region  = var.region
}

# Enable required APIs
resource "google_project_service" "required" {
  for_each = toset([
    "container.googleapis.com",
    "compute.googleapis.com",
    "sqladmin.googleapis.com",
    "servicenetworking.googleapis.com"
  ])
  project = var.project_id
  service = each.value
}

# Create GKE cluster
resource "google_container_cluster" "primary" {
  name               = var.cluster_name
  location           = var.zone
  remove_default_node_pool = true
  initial_node_count = 1
  network            = "default"
  subnetwork         = "default"

  ip_allocation_policy {
    use_ip_aliases = true
  }
}

# Create node pool
resource "google_container_node_pool" "primary_nodes" {
  name       = "primary-node-pool"
  cluster    = google_container_cluster.primary.name
  location   = var.zone

  node_config {
    machine_type = "e2-medium"
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
  }

  initial_node_count = 2
}

# Create Cloud SQL Instance (MySQL with private IP)
resource "google_sql_database_instance" "mysql_instance" {
  name             = var.sql_instance_name
  database_version = "MYSQL_8_0"
  region           = var.region

  settings {
    tier = "db-f1-micro"

    ip_configuration {
      ipv4_enabled    = false
      private_network = "projects/${var.project_id}/global/networks/default"
    }
  }

  deletion_protection = false
}

# Create database
resource "google_sql_database" "main_db" {
  name     = "appdb"
  instance = google_sql_database_instance.mysql_instance.name
}

# Set root password for SQL
resource "google_sql_user" "root" {
  name     = "root"
  instance = google_sql_database_instance.mysql_instance.name
  host     = "%"
  password = var.db_root_password
}

# Reserve IP range for PSA
resource "google_compute_global_address" "private_ip_range" {
  name          = "google-managed-services-default"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = "default"
}

# Establish PSA connection
resource "google_service_networking_connection" "private_vpc_connection" {
  network                 = "default"
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_ip_range.name]
}

# GKE Auth
provider "kubernetes" {
  host                   = google_container_cluster.primary.endpoint
  token                  = data.google_client_config.default.access_token
  cluster_ca_certificate = base64decode(google_container_cluster.primary.master_auth[0].cluster_ca_certificate)
}

data "google_client_config" "default" {}
