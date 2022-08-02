<template>

    <swiper class="swiper" :swiperCurrent="swiperCurrent" :change:swiperCurrent="swiperCurrentChange" ref="refSwiper"
        @change="change" @transition="transition" @animationfinish="animationfinish" :disable-touch="disableTouch"
        :indicator-dots="false" :vertical="vertical" :duration="duration" circular :autoplay="autoplay"
        :interval="interval" :easingFunction="easingFunction">
        <swiper-item v-for="(item, index) in 3" :key="index" :data-vertical="vertical" :data-current="current"
            :data-data-length="dataLength" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
            <slot v-if="list[swiperList[index]]" :item="list[swiperList[index]]" :index="swiperList[index]"></slot>
            <text>{{ test(index) }}</text>
        </swiper-item>
         <text>{{ test(-1) }}</text>
    </swiper>

</template>

<script setup lang="ts">
import { Prop, PropType, reactive, Ref, ref, toRefs, watch } from 'vue';
type TItem = Record<string, any>
const props = defineProps({
    list: { type: Array as PropType<Array<TItem>>, default: () => [], required: true },
    dataIndex: { type: Number, default: 0 },
    vertical: { type: Boolean, default: false },
    duration: { type: Number, default: 250 },
    autoplay: { type: Boolean, default: false },
    interval: { type: Number, default: 5000 },
    easingFunction: { type: String, default: 'default' },
    getPreviousHandler: { type: Function },
    getNextHandler: { type: Function }
})
const emits = defineEmits(['animationfinish', 'transition', 'indexesChange', 'change'])
type Props = typeof props
const params = reactive({
    dataLength: 0,
    swiperCurrent: 0,
    swiperList: [] as Array<number>,
    current: 0,
    touchStartObj: {},
    disableTouch: false
})
type Params = typeof params
const test = function (index: number) {
    console.log('test...', index, props.list[index])
}

const useTouchMove = function (params: Params, props: Props) {
    //app nvue
    const touchStartObj = reactive({
        pageX: 0,
        pageY: 0
    })
    const touchStart = function (e: any) {
        const item = e.changedTouches[0];
        touchStartObj.pageX = item.pageX;
        touchStartObj.pageY = item.pageY
    }
    const touchMove = function (e: any) {

        var moveObj = e.changedTouches[0];
        var current = params.current
        var vertical = props.vertical
        var dataLength = params.dataLength
        var preDir = vertical ? moveObj.pageY - touchStartObj.pageY > 0 : moveObj.pageX - touchStartObj.pageX > 0
        var nextDir = vertical ? moveObj.pageY - touchStartObj.pageY < 0 : moveObj.pageX - touchStartObj.pageX < 0
        if (current == 0 && preDir) {
            params.disableTouch = true
            // #ifdef APP-PLUS || H5
            e.stopPropagation();
            // #endif
            // #ifndef APP-PLUS || H5
            return false
            // #endif
        } else if (current == dataLength - 1 && nextDir) {
            params.disableTouch = true
            // #ifdef APP-PLUS || H5
            e.stopPropagation();
            // #endif
            // #ifndef APP-PLUS || H5
            return false
            // #endif
        }
    }
    const touchEnd = function () {
        params.disableTouch = false
    }
    return {
        touchStart,
        touchMove,
        touchEnd
    }
}
const refSwiper = ref(null);
const { dataLength, swiperCurrent, swiperList, current, touchStartObj, disableTouch } = toRefs(params)
const { touchStart, touchMove, touchEnd } = useTouchMove(params, props)
const goPrevious = () => { if (current.value > 0) swiperCurrent.value = (3 + swiperCurrent.value - 1) % 3 }
const goNext = () => { if (current.value < dataLength.value - 1) swiperCurrent.value = (swiperCurrent.value + 1) % 3 }

const animationfinish = (e: any) => emits('animationfinish', e)
const transition = (e: any) => emits('transition', e)


const handleList = function (index: number) {
    //
    switch (index) {
        case 0:
            swiperList.value[1] = (swiperList.value[0] + 1) % dataLength.value;
            swiperList.value[2] = swiperList.value[0] == 0 ? dataLength.value - 1 : swiperList.value[0] - 1
            break;
        case 1:
            swiperList.value[2] = (swiperList.value[1] + 1) % dataLength.value;
            swiperList.value[0] = swiperList.value[1] == 0 ? dataLength.value - 1 : swiperList.value[1] - 1
            break;
        case 2:
            swiperList.value[0] = (swiperList.value[2] + 1) % dataLength.value;
            swiperList.value[1] = swiperList.value[2] == 0 ? dataLength.value - 1 : swiperList.value[2] - 1
            break;
        default:
            swiperList.value[0] = props.dataIndex
            swiperList.value[1] = (swiperList.value[0] + 1) % dataLength.value;
            swiperList.value[2] = swiperList.value[0] == 0 ? dataLength.value - 1 : swiperList.value[0] - 1
    }
    emits('indexesChange', swiperList.value)
}
const handleListDataIndexChange = function () {
    let index = swiperCurrent.value
    switch (index) {
        case 0:
            swiperList.value[0] = props.dataIndex
            swiperList.value[1] = (swiperList.value[0] + 1) % dataLength.value
            swiperList.value[2] = swiperList.value[0] == 0 ? dataLength.value - 1 : swiperList.value[0] - 1
            break;
        case 1:
            swiperList.value[1] = props.dataIndex
            swiperList.value[2] = (swiperList.value[1] + 1) % dataLength.value
            swiperList.value[0] = swiperList.value[1] == 0 ? dataLength.value - 1 : swiperList.value[1] - 1
            break;
        case 2:
            swiperList.value[2] = props.dataIndex
            swiperList.value[0] = (swiperList.value[2] + 1) % dataLength.value
            swiperList.value[1] = swiperList.value[2] == 0 ? dataLength.value - 1 : swiperList.value[2] - 1
            break;
        default:
            swiperList.value[0] = props.dataIndex
            swiperList.value[1] = (swiperList.value[0] + 1) % dataLength.value
            swiperList.value[2] = swiperList.value[0] == 0 ? dataLength.value - 1 : swiperList.value[0] - 1
    }
    emits('indexesChange', swiperList.value)
    //this.$emit('indexesChange', this.swiperList);
}
const insertPrevious = function () {
    current.value++
    swiperList.value[swiperCurrent.value]++
    handleList(swiperCurrent.value);
}

const change = async function (e: any) {
    const cur = e.detail.current as number
    swiperCurrent.value = cur
    handleList(cur);
    current.value = swiperList.value[cur];
    if (current.value == 0 && props.getPreviousHandler) {
        let hasPrevious = await props.getPreviousHandler()
        if (hasPrevious) {
            insertPrevious()
        }
    } else if (current.value == dataLength.value - 1 && props.getNextHandler) {
        let hasNext = await props.getNextHandler()
        if (hasNext) {
        }
    }
    //必须在这，可能insertPrevious 会++
    emits('change', current.value)
}

const swiperCurrentChange = function (newVal: any, oldVal: any, vm: any) {
    let offset = newVal - oldVal
    if (offset > 1) offset = -1
    if (offset < -1) offset = 1
    const swiper = refSwiper.value as any
    // 指定动画行为，否则当滑到循环处时，会出现反向滑动的BUG  
    swiper.currentChangeSource = 'autoplay'
    // 滑动索引跟进  
    swiper.currentSync = newVal
    // 播放滑动动画，第三个参数决定了滑动方向，大于0时右滑，小于0时左滑  
    //swiper._animateViewport(newVal, '', offset)
}

watch(() => props.dataIndex, () => {
    current.value = props.dataIndex
    emits('change', current.value)
    handleListDataIndexChange()
}, { immediate: true })

watch(() => props.list, () => {
    dataLength.value = props.list.length
    if (dataLength.value) {
        handleList(swiperCurrent.value);
    }
}, { immediate: true })

</script>
<style scoped>
.swiper {
    height: 100%
}
</style>
