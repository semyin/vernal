import { Meta } from "../meta/type"

export interface Site {
  id: number
  name: string
  url: string
  description: string
  copyright: string
  icp: string
  runTime: string
}

export interface SiteWithBaseMeta {
  site: Site
  meta: Meta[]
}