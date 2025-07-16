# variables.tf

variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

variable "region" {
  description = "Region for GCP resources"
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "Zone for GKE cluster"
  type        = string
  default     = "us-central1-a"
}

variable "gke_cluster_name" {
  description = "Name of the GKE cluster"
  type        = string
  default     = "my-gke-cluster"
}

variable "db_instance_name" {
  description = "Name of the Cloud SQL instance"
  type        = string
  default     = "my-mysql-instance"
}

variable "db_user" {
  description = "Root username for MySQL"
  type        = string
  default     = "root"
}

variable "db_password" {
  description = "Root password for MySQL"
  type        = string
  sensitive   = true
}

variable "db_name" {
  description = "Name of the default database to create"
  type        = string
  default     = "defaultdb"
}
