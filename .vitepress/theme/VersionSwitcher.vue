<script setup lang="ts">
import { useRouter, useData } from 'vitepress'
import { computed } from 'vue'
import VPFlyout from 'vitepress/dist/client/theme-default/components/VPFlyout.vue'
import VPMenuLink from 'vitepress/dist/client/theme-default/components/VPMenuLink.vue'

const props = defineProps<{
  versioningPlugin: { versions: string[], latestVersion: string }
  screenMenu?: boolean
}>()

const router = useRouter()
const { site } = useData()

const localeKeys = computed(() =>
  Object.keys(site.value.locales ?? {}).filter(k => k !== 'root')
)

const currentLocale = computed(() => {
  const path = router.route.path
  for (const locale of localeKeys.value) {
    if (path.startsWith(`/${locale}/`) || path === `/${locale}`) {
      return `/${locale}`
    }
  }
  return ''
})

const currentPath = computed(() => {
  let path = router.route.path
  if (currentLocale.value) path = path.slice(currentLocale.value.length)
  for (const v of props.versioningPlugin.versions) {
    if (path.startsWith(`/${v}/`) || path === `/${v}`) {
      return path.slice(`/${v}`.length)
    }
  }
  return path
})

const currentVersion = computed(() => {
  let path = router.route.path
  if (currentLocale.value) path = path.slice(currentLocale.value.length)
  for (const v of props.versioningPlugin.versions) {
    if (path.startsWith(`/${v}/`)) return v
  }
  return props.versioningPlugin.latestVersion
})

function linkFor(version: string) {
  const locale = currentLocale.value
  const page = currentPath.value || '/'
  if (version === props.versioningPlugin.latestVersion) return `${locale}${page}` || '/'
  return `${locale}/${version}${page}`
}

function semverDesc(a: string, b: string) {
  const ap = a.split('.').map(Number)
  const bp = b.split('.').map(Number)
  for (let i = 0; i < Math.max(ap.length, bp.length); i++) {
    const diff = (bp[i] ?? 0) - (ap[i] ?? 0)
    if (diff !== 0) return diff
  }
  return 0
}

const otherVersions = computed(() =>
  [props.versioningPlugin.latestVersion, ...props.versioningPlugin.versions]
    .filter(v => v !== currentVersion.value)
    .sort(semverDesc)
)
</script>

<template>
  <VPFlyout class="VPVersionSwitcher" icon="vpi-versioning" :button="currentVersion" label="Switch Version">
    <div class="items">
      <VPMenuLink
        v-for="v in otherVersions"
        :key="v"
        :item="{ text: v, link: linkFor(v) }"
      />
    </div>
  </VPFlyout>
</template>

<style>
.vpi-versioning {
  --icon: url("data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iNjRweCIgaGVpZ2h0PSI2NHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHN0cm9rZS13aWR0aD0iMi4yIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNvbG9yPSIjMDAwMDAwIj48cGF0aCBkPSJNMTcgN0MxOC4xMDQ2IDcgMTkgNi4xMDQ1NyAxOSA1QzE5IDMuODk1NDMgMTguMTA0NiAzIDE3IDNDMTUuODk1NCAzIDE1IDMuODk1NDMgMTUgNUMxNSA2LjEwNDU3IDE1Ljg5NTQgNyAxNyA3WiIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIuMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+PHBhdGggZD0iTTcgN0M4LjEwNDU3IDcgOSA2LjEwNDU3IDkgNUM5IDMuODk1NDMgOC4xMDQ1NyAzIDcgM0M1Ljg5NTQzIDMgNSAzLjg5NTQzIDUgNUM1IDYuMTA0NTcgNS44OTU0MyA3IDcgN1oiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyLjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPjxwYXRoIGQ9Ik03IDIxQzguMTA0NTcgMjEgOSAyMC4xMDQ2IDkgMTlDOSAxNy44OTU0IDguMTA0NTcgMTcgNyAxN0M1Ljg5NTQzIDE3IDUgMTcuODk1NCA1IDE5QzUgMjAuMTA0NiA1Ljg5NTQzIDIxIDcgMjFaIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMi4yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD48cGF0aCBkPSJNNyA3VjE3IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMi4yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD48cGF0aCBkPSJNMTcgN1Y4QzE3IDEwLjUgMTUgMTEgMTUgMTFMOSAxM0M5IDEzIDcgMTMuNSA3IDE2VjE3IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMi4yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD48L3N2Zz4=")
}
.VPVersionSwitcher { display: flex; align-items: center; }
</style>
