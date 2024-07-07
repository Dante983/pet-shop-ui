<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <div class="user-header">
        <img :src="user.avatar" class="avatar-large" />
        <div class="user-info">
          <h2>User settings</h2>
          <div class="user-details">
            <div>
              <strong>Name</strong> {{ user.first_name }} {{ user.last_name }}
            </div>
            <div><strong>Phone number</strong> {{ user.phone_number }}</div>
            <div><strong>Address</strong> {{ user.address }}</div>
            <div>
              <strong>Date joined</strong>
              {{ new Date(user.created_at).toLocaleDateString() }}
            </div>
            <div><strong>Email</strong> {{ user.email }}</div>
            <div>
              <strong>Marketing preferences</strong>
              {{ user.is_marketing ? "Yes" : "No" }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user", "isVisible"],
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 800px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
}

.user-header {
  display: flex;
  align-items: center;
}

.avatar-large {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-details {
  display: flex;
  flex-wrap: wrap;
}

.user-details > div {
  flex: 1 1 50%;
  margin-bottom: 10px;
}
</style>
