
<template>
  <div class="item"
       :class="{
         border : multiLine,
         clickable : isClickable
        }"
       @click="expand = !expand">

    <!-- Item Preview -->
    <div class="between">

      <!-- Aside -->
      <div v-if="$slots.thumbnail" class="thumbnail">
        <slot name="thumbnail"></slot>
      </div>

      <!-- Main -->
      <div class="content">
        <!-- First line of item -->
        <div class="row item-title">
          <slot name="title"></slot>
        </div>

        <!-- Second line of item -->
        <div class="row">
          <slot name="second"></slot>
        </div>

        <!-- Third line of item -->
        <div class="row third">
          <slot name="third"></slot>
        </div>
      </div>

      <!-- Index -->
      <div v-if="$slots.metadata" class="metadata">
        <slot name="metadata"></slot>
      </div>

      <div v-if="$slots.menu" class="item-menu" @click.stop>
        <slot name="menu"></slot>
      </div>

    </div>

    <transition appear name="expand">
      <div v-if="expanded" class="item-expanded">
        <div class="item-details">
          <slot name="details"></slot>
        </div>
        <div class="item-actions" @click.stop>
          <slot name="actions"></slot>
        </div>
        <div>
          <icon icon="angle-up" class="icon"></icon>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  props: {
    clickable: Boolean
  },
  data () {
    return {
      expand: false
    }
  },
  computed: {
    expanded () {
      if (this.$slots.details || this.$slots.actions) {
        if (this.expand) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    multiLine () {
      if (this.$slots.second) {
        return true
      } else {
        return false
      }
    },
    isClickable () {
      if (this.$slots.details || this.$slots.actions || this.clickable) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .item {
    position: relative;
    padding: 16px 0;
    transition: 250ms all;
    background-color: #fff;
  }

  .border {
    border-bottom: 1px solid $accent;
  }

  .clickable:hover {
    cursor: pointer;
  }

  .thumbnail {
    @include center;
    @include align;
    margin-right: 16px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: $accent;
    overflow: hidden;
    img {
      width: 100%;
    }
  }

  .content {
    @include grow;
    width: 150px;
  }

  .row {
    @include between;
    font-size: 16px;
    color: $dark;
    overflow: hidden;
    line-height: 1.25;
  }

  .item-title {
    color: $theme;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 4px;
  }

  .item-menu {
    position: absolute;
    right: 0;
    top: 0;
  }

  .metadata {
    @include last;
    text-align: right;
    width: 32px;
    color: $dark;
    font-size: 14px;
    margin-left: 16px;
  }

  .item-expanded {
    height: 280px;
    opacity: 1;
    transition: all 250ms ease;
  }

  .item-details {
    color: $dark;
    line-height: 1.25;
  }

  .item-actions {
    padding: 16px;
  }

  .icon {
    color: $dark;
    position: absolute;
    bottom: 16px;
    left: 50%;
    right: 50%;
  }

  .expand-enter, .expand-leave-to {
    opacity: 0;
    height: 0px;
  }
</style>
