export interface Meta {
  id: number
  name: string
  property: string
  content: string
  isDefault: boolean
  resourceType: string
  resourceId: number
  createdAt: string
  updatedAt: string
}

export interface MetaData {
  id: number;
  name: string;
  content: string;
  isDefault: boolean;
  resourceType: string;
  resourceId: number;
}