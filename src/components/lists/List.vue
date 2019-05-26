<template>
  <div class="list">

    <!-- Main Content in List -->
    <div class="list-main main">

      <div class="list-title">
        <slot name="title"></slot>
      </div>

      <div class="actions">
        <slot name="actions"></slot>
      </div>

      <div v-if="$slots.asideContent" class="mobile col">
        <span class="toggle-filter click"
              @click="showSheet = true">
          Show Filter
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
      <div class="main sheet"
           :class="{ show : showSheet }"
           @click.stop>

        <div class="sheet-title">
          <slot name="asideTitle"></slot>
          <icon class="icon click"
                icon="times"
                @click="showSheet = false">
          </icon>
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
    @include stretch;
  }

  .list-main {
    @include grow;
    max-width: 600px;
    margin: auto;
    hr {
      margin: 10px 0 0 0;
    }
  }

  .actions {
    @include around;
    @include wrap;
  }

  .toggle-filter {
    color: royalblue;
    text-decoration: underline;
  }

  .list-title {
    margin-bottom: 10px;
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
      visibility: visible;
    }
  }

  .sheet {
    box-shadow: $box-shadow-light;
    background-color: #fff;
    width: 260px;
    height: 100%;
    padding: 0 15px;
    @media screen and (max-width: 999px) {
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
    margin-bottom: 15px;
    padding-top: 100px;
    @media screen and (max-width: 999px) {
      padding-top: 120px;
    }
    .icon {
      color: rgba(0,0,0,.35);
      @media screen and (min-width: 1000px) {
        display: none;
      }
    }
  }
</style>
