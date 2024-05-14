<script setup lang="ts">
import { sleep } from '@lihaochen/kite'
import type { CSSProperties } from 'vue'

useHead({
  title: '(っ˘з(˘⌣˘ ) ♡',
})

const input = ref(0)
async function handleGenerate() {
  clearCount()

  if (input.value <= 0)
    return

  await nextTick()
  await sleep(300)
  setStyle(input.value)
  stepIncrementCount(input.value ** 2)
}

const count = ref(0)
function clearCount() {
  count.value = 0
}
async function stepIncrementCount(max: number) {
  if (count.value < max) {
    count.value += 1
    await sleep(20)
    stepIncrementCount(max)
  }
}

const el = ref<HTMLElement>()
const { width } = useElementBounding(el)
const style = shallowRef<CSSProperties>({})
function setStyle(cols: number) {
  const gap = 4
  const size = (width.value - (cols - 1) * gap) / cols
  style.value = {
    width: `${size}px`,
    height: `${size}px`,
  }
}

const current = ref(-1)
function resetCurrent() {
  current.value = -1
}
function changeCurrent(val: number) {
  current.value = val
}
</script>

<template>
  <div
    flex="~ col items-center" gap4 min-h-screen p="x2 y5"
    @click="resetCurrent"
  >
    <div flex="~ center" gap2 wfull text-sm>
      <input
        v-model.number="input"
        placeholder="Please enter count"
        flex-auto max-w80 h10 p="x3 y2"
        outline="focus-visible:none"
        rd-md border="~ slate3 focus-visible:blue6"
        @keydown.enter="handleGenerate"
      >
      <button
        flex="~ center" h10 px3
        rd-md border="~ blue6"
        bg-blue6 text-white
        transition scale="active:98"
        @click="handleGenerate"
      >
        Generate
      </button>
    </div>
    <div wfull max-w-screen-lg>
      <ul ref="el" flex="~ wrap" gap1 wfull>
        <TransitionGroup name="list">
          <li
            v-for="cur in count" :key="cur"
            flex-none rd-md
            :style="style"
            :class="cur === current ? 'bg-blue6' : 'bg-gray'"
            @click.stop="changeCurrent(cur)"
          />
        </TransitionGroup>
      </ul>
    </div>
  </div>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
