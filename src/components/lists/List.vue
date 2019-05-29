<template>
  <div class="list">

    <!-- Main Content in List -->
    <div class="list-main">

      <div class="list-title">
        <slot name="title"></slot>
      </div>

      <div class="actions">
        <slot name="actions"></slot>
      </div>

      <div v-if="$slots.asideContent" class="mobile end toggle-filter">
        <span class="click"
              @click="showSheet = true">
          Show Filter
          <icon icon="angle-right"></icon>
        </span>
      </div>

      <hr>

      <div class="content">
        <slot name="content"></slot>
      </div>

    </div>

    <!-- Aside sheet filter -->
    <div v-if="$slots.asideContent"
         class="aside"
         :class="{ show : showSheet }"
         @click="showSheet = false">
      <div class="sheet"
           :class="{ show : showSheet }"
           @click.stop>

        <div class="sheet-title">
          <slot name="asideTitle"></slot>
          <button class="text micro" @click="showSheet = false">
            <icon class="icon click" icon="times"></icon>
          </button>
        </div>

        <div class="sheet-content">
          <slot name="asideContent"></slot>
        </div>

        <div class="col">
          <button @click="showSheet = false">
            <slot name="asideAction"></slot>
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      showSheet: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .list {
    @include row;
    position: relative;
  }

  .list-main {
    @include grow;
    max-width: 600px;
    margin: 0 auto;
    padding: 0 16px;
    hr {
      color: rgba(0,0,0,.12);
      margin: 0;
    }
  }

  .actions {
    @include around;
    @include wrap;
    padding-bottom: 16px;
  }

  .toggle-filter {
    color: royalblue;
    padding-bottom: 16px;
  }

  .list-title {
    padding-bottom: 16px;
  }

  .aside {
    @media screen and (max-width: 999px) {
      visibility: hidden;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.75);
    }
    @media screen and (min-width: 1000px) {
      min-height: 100vh;
      visibility: visible;
    }
  }

  .sheet {
    border-left: 1px solid rgba(0,0,0,.12);
    background-color: #fff;
    width: 264px;
    height: 100%;
    padding: 0 16px;
    @media screen and (max-width: 999px) {
      box-shadow: $box-shadow-light;
      padding: 80px 16px;
      position: fixed;
      top: 0;
      right: 0;
      transform: translateX(300px);
    }
  }

  .show {
    @media screen and (max-width: 999px) {
      visibility: visible;
      transform: translateX(0px);
      transition: 250ms all;
    }
  }

  .sheet-title {
    @include align;
    @include between;
    font-size: 20px;
    margin-bottom: 16px;
    .icon {
      font-size: 20px;
      color: rgba(0,0,0,.35);
      @media screen and (min-width: 1000px) {
        display: none;
      }
    }
  }
</style>
