<template>
    <div class="pay">
       <div v-html="payUrl">
          {{payUrl}}
       </div>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
           payUrl:this.$route.query.htmlData
        };
    },
    methods: {

    },
    mounted(){
       this.payUrl = this.$route.query.htmlData;
       this.$nextTick(()=> {
            document.forms[0].submit()
        })
    },
    components: {

    },
};
</script>

<style scoped lang="scss">

</style>
