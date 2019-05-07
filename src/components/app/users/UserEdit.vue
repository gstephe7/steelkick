<template>
  <div col center modal>
    <div card class="modal-box">

      <div between align>
        <h2>Edit User</h2>
        <icon small click icon="times" @click="$emit('close')">
        </icon>
      </div>

      <hr>

      <div>
        <dl>
          <div row>
            <dt>
              First Name:
            </dt>
            <dd grow>
              {{ user.firstName }}
            </dd>
          </div>
          <div row>
            <dt>
              Last Name:
            </dt>
            <dd grow>
              {{ user.lastName }}
            </dd>
          </div>
          <div row>
            <dt>
              Email:
            </dt>
            <dd grow>
              {{ user.email }}
            </dd>
          </div>
        </dl>
      </div>

      <div>
        <label between align>
          Admin:
          <select v-if="user.owner">
            <option selected>Yes</option>
          </select>
          <select v-else v-model="user.admin">
            <option :value="false">No</option>
            <option :value="true">Yes</option>
          </select>
        </label>
      </div>

      <br>

      <div col>
          <button green @click="updateUser">Update User</button>
          <button red @click="toggleDelete">Delete User</button>
      </div>

      <br>

      <div col center v-if="showDelete">
        <p>Are you sure you want to delete this user?</p>
        <div around>
          <button small @click="toggleDelete">No</button>
          <button small @click="deleteUser">Yes</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import api from '@/api/api'

export default {
  props: ['user'],
  data () {
    return {
      showDelete: false
    }
  },
  methods: {
    toggleDelete () {
      this.showDelete = !this.showDelete
    },
    updateUser () {
      this.$store.dispatch('loading')
      api.axios.put(`${api.baseUrl}/users/edit-user`, {
        user: this.user
      })
      .then(() => {
        this.$store.dispatch('complete')
        this.$router.push('manage-users')
      })
      .catch(() => {
        this.$store.dispatch('complete')
      })
    },
    deleteUser () {
      this.$store.dispatch('loading')
      api.axios.delete(`${api.baseUrl}/users/delete-user`, {
        params: {
          id: this.user._id
        }
      })
      .then(() => {
        this.$store.dispatch('complete')
        this.$router.push('manage-users')
      })
      .catch(() => {
        this.$store.dispatch('complete')
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  dl {
    text-align: left;
  }

  dt {
    width: 90px;
  }

  .modal-box {
    background-color: white;
    margin: 5px;
    h2 {
      margin: 5px 0;
    }
  }
</style>
