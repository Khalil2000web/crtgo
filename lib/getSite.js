import { sites } from "./sites"

export async function getSite(slug) {
  return sites.find((site) => site.slug === slug)
}