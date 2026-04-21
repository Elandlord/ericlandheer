<template>
    <section
        class="border border-line overflow-hidden"
        style="background: rgba(10,15,31,0.78); box-shadow: 0 20px 60px -20px rgba(0,0,0,0.6)"
    >
        <div
            class="px-[14px] py-2 border-b border-line font-mono-chrome text-[11px] flex items-center"
            style="background: rgba(17,24,39,0.6); color: #7d8590; gap: 18px"
        >
            <span class="flex gap-[6px]">
                <span style="width:10px;height:10px;border-radius:5px;background:#ef4444" />
                <span style="width:10px;height:10px;border-radius:5px;background:#f59e0b" />
                <span style="width:10px;height:10px;border-radius:5px;background:#10b981" />
            </span>
            <span>File</span><span>Edit</span><span>Selection</span><span>View</span><span>Go</span>
            <span class="ml-auto" style="color: #22d3ee">skills.workspace</span>
        </div>
        <div style="display:grid;grid-template-columns:220px 1fr;min-height:580px">
            <aside
                class="border-r border-line font-mono-chrome text-[12px]"
                style="background: rgba(3,6,17,0.6); padding: 14px 10px"
            >
                <div
                    style="color:#7d8590;letter-spacing:1px;font-size:10.5px;padding:4px 8px 8px;text-transform:uppercase"
                >Explorer</div>
                <div v-for="(node, i) in tree" :key="i">
                    <div
                        class="flex items-center gap-[6px] px-2 py-[3px]"
                        style="color: #e6edf3"
                    >
                        <span style="color: #f59e0b">▾</span>
                        <span>{{ node.label }}</span>
                    </div>
                    <button
                        v-for="(child, j) in node.children"
                        :key="j"
                        type="button"
                        class="w-full text-left cursor-pointer font-mono-chrome text-[12px] flex items-center gap-[6px] border-0"
                        :style="{
                            padding: '4px 8px 4px 26px',
                            background: active === child.id ? 'rgba(34,211,238,0.08)' : 'transparent',
                            color: active === child.id ? '#e6edf3' : '#94a3b8',
                            borderLeft: active === child.id ? '2px solid #22d3ee' : '2px solid transparent',
                        }"
                        @click="$emit('update:active', child.id)"
                    >
                        <span :style="{ color: child.dot }">●</span>
                        <span>{{ child.filename }}</span>
                    </button>
                </div>
                <div style="margin-top:20px;color:#475569;letter-spacing:1px;font-size:10px;padding:4px 8px;text-transform:uppercase">Timeline</div>
                <div style="padding:4px 8px;color:#7d8590;font-size:11px">6 files · clean working tree</div>
            </aside>
            <div class="flex flex-col">
                <div
                    class="flex border-b border-line overflow-auto"
                    style="background: rgba(17,24,39,0.4)"
                >
                    <button
                        v-for="t in tabs"
                        :key="t.id"
                        type="button"
                        class="font-mono-chrome text-[12px] cursor-pointer border-0 flex items-center gap-2 whitespace-nowrap"
                        :style="{
                            padding: '10px 14px',
                            background: t.id === active ? 'rgba(10,15,31,0.78)' : 'transparent',
                            color: t.id === active ? '#e6edf3' : '#7d8590',
                            borderRight: '1px solid rgba(148,163,184,0.14)',
                            borderTop: t.id === active ? '2px solid #22d3ee' : '2px solid transparent',
                        }"
                        @click="$emit('update:active', t.id)"
                    >
                        <span :style="{ color: t.dot }">●</span>
                        <span>{{ t.filename }}</span>
                        <span style="color: #475569; margin-left: 8px">×</span>
                    </button>
                </div>
                <div class="flex-1 relative"><slot /></div>
                <div
                    class="px-[14px] py-[6px] border-t border-line font-mono-chrome flex gap-4"
                    style="background: rgba(17,24,39,0.4); font-size: 10.5px; color: #7d8590"
                >
                    <span style="color: #22d3ee">⎇ main</span>
                    <span>UTF-8</span>
                    <span>LF</span>
                    <span class="ml-auto">Ln 1, Col 1</span>
                    <span style="color: #a3e635">● ready</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
export interface IdeTabDef {
    id: string;
    filename: string;
    dot: string;
}
export interface IdeTreeNode {
    label: string;
    children: IdeTabDef[];
}

defineProps<{
    tabs: IdeTabDef[];
    tree: IdeTreeNode[];
    active: string;
}>();

defineEmits<{ (e: 'update:active', id: string): void }>();
</script>
