<script lang="ts" setup>
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import type { MenuItem } from 'primevue/menuitem'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{
  items: MenuItem[]
}>()

function handleTabChange(value: string ) {
  if (value) router.push(value)
}
</script>

<template>
  <div class="card">
    <Tabs :value="items[0].to">
      <TabList >
        <Tab  v-for="(tab, index) in items" :key="index" :value="tab.to" @click="handleTabChange(tab.to)">
          <span class="flex items-center gap-2">
            <i :class="tab.icon" />
            <span>{{ tab.label }}</span>
          </span>
        </Tab>
      </TabList>
    </Tabs>
  </div>
</template>
