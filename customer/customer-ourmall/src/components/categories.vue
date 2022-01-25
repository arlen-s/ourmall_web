<template>
  <div class="categories-nav" :class="{more: showMore}">
    <h2 title="ALL CATEGORIES">Categories</h2>
    <ul class="c-nav">
      <template v-for="(c, ci) in categories">
        <li v-if="ci < 10 || showMore"  :key="c.id">
          <router-link :title="c.name" class="c-link" :to="{path: `/category/${c.id}/${c.name.replace(/\s+/g,'-')}.html`}" @click.native="categoryRecord(c.id, c.name, 1)">
            <div class="left">
              <i class="c-icon" :class="`c-${c.id}`"></i>
              <span class=" tx-ellipsis1">{{c.name}}</span>
            </div>
            <i class="fa fa-angle-right" aria-hidden="true" style="margin-left: 15px;"></i>
          </router-link>
          <div class="sub-menu" v-if="c.list && c.list.length!= 0">
            <ul class="l1">
              <template v-for="sub in c.list">
                <li :key="sub.id">
                  <router-link :to="{path: `/category/${sub.id}/${sub.name.replace(/\s+/g,'-')}.html`}" @click.native="categoryRecord(sub.id, sub.name, 2)" :title="sub.name">{{sub.name}}</router-link>
                  <ul v-if="sub.list && sub.list.length" class="l2">
                    <li v-for="sub2 in sub.list" :key="sub2.id">
                      <router-link :to="{path: `/category/${sub2.id}/${sub2.name.replace(/\s+/g,'-')}.html`}" @click.native="categoryRecord(sub2.id, sub2.name, 2)" :title="sub2.name">{{sub2.name}}</router-link>
                    </li>
                  </ul>
                </li>
              </template>
            </ul>
          </div>
        </li>
      </template>
    </ul>
    <div class="more" v-if="categories && categories.length > 9">
      <a href="javascript:;" @click="moreChange">
        <i class="fa " :class="showMore ? 'fa-minus-square-o':'fa-plus-square-o'" aria-hidden="true"></i>
        <span>{{showMore ? 'Collapse':'More'}}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["categories"],
  data(){
    return {
      showMore: false,
    }
  },
  methods: {
    categoryRecord (id, name, level) {
      localStorage.setItem('c_buryResource', 'category')
      if (level == 1) {
        this.$Burying({
          object: '5002',
          objectId: id,
          objectUrl: name
        })
      } else if (level == 2) {
        this.$Burying({
          object: '5003',
          objectId: id,
          objectUrl: name
        })
      }
    },
    moreChange(){
      this.showMore = !this.showMore;
    }
  }
}
</script>

<style lang="scss" scoped>
ul,ol,li{
    list-style: none;
    padding: 0;
}
a{
  color: #555;
  text-decoration:none
}
a:hover{
    color: #5a6cc4;
}
.categories-nav{
  box-shadow: 0px 2px 9px 0px rgba(180, 180, 180 ,0.2);
  position: relative;
  background-color: #fff;
  width: 234px;
  max-height: 434px;
  min-width: 234px;
  h2{
    margin: 0;
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    color: #5a6cc4;
    font-weight: bold;
    font-size: 16px;
    > a{
      color: #5a6cc4;
    }
  }
  .c-nav{
    > li{
      position: relative;
      .c-link{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px 0 20px;
        height: 34px;
        > .left{
          display: flex;
          align-items: center;
          span{
            max-width: 155px;
          }
        }
      }
      .sub-menu{
        display: none;
        position: absolute;
        top: 0;
        left: 234px;
        z-index: 2;
        background-color: #fff;
        box-shadow: 0 0 5px 1px #ccc;
        padding: 15px;
        ul.l1{
          > li{
            margin-bottom: 5px;
            width: 680px;
            >a{
              color: #5a6cc4;
              font-weight: bold;
            }
            ul.l2{
              display: flex;
              flex-wrap: wrap;
              margin: 9px 0 9px -12px;
              li{
                position: relative;
                display: flex;
                align-items: center;
                padding: 0 15px;
                white-space:nowrap;
                a{
                  line-height: 22px;
                  font-size: 14px;
                }
              }
            }
            li::before{
              position: absolute;
              right: 0;
              top: 50%;
              transform: translateY(-50%);
              display: block;
              content: '';
              height: 12px;
              border-right: 1px solid #4e4e4e;
            }
          }
        }
      }
    }
    > li:hover{
      .sub-menu{
        display: block;
      }
      .c-link{
        background-color: #F5F5F5;
      }
    }
  }
  .more{
    display: flex;
    padding-bottom: 11px;
    padding-left: 25px;
    height: 35px;
    i{
      margin-right: 15px;
    }
  }
  .more:hover{
    color: #5a6cc4;
  }
}
.categories-nav.more{
  max-height: 9999px;
  box-shadow: 0 0 6px 1px #ccc;
}
</style>