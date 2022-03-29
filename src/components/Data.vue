<template>
  <div v-if="currentData" class="edit-form">
    <h4>Data</h4>
    <form>
      <div class="form-group">
        <label for="city">City</label>
        <input type="text" class="form-control" id="data"
          v-model="currentData.city"
        />
      </div>
      <div class="form-group">
        <label for="district">District</label>
        <input type="text" class="form-control" id="district"
          v-model="currentData.district"
        />
      </div>
     
    </form>
    <button class="badge badge-primary mr-2"
      v-if="currentData.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>
    <button class="badge badge-danger mr-2"
      @click="deleteData"
    >
      Delete
    </button>
    <button type="submit" class="badge badge-success"
      @click="updateData"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Please click on a Data...</p>
  </div>
</template>
<script>
import DataDataService from "../services/DataDataService";
export default {
  name: "data_",
  data() {
    return {
      currentData: null,
      message: ''
    };
  },
  methods: {
    getData(id) {
      DataDataService.get(id)
        .then(response => {
          this.currentData = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updatePublished(status) {
      var data = {
        id: this.currentData.id,
        city: this.currentData.city,
        district: this.currentData.district,
        published: status
      };
      DataDataService.update(this.currentData.id, data)
        .then(response => {
          console.log(response.data);
          this.currentData.published = status;
          this.message = 'The status was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateData() {
      DataDataService.update(this.currentData.id, this.currentData)
        .then(response => {
          console.log(response.data);
          this.message = 'The Data was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteData() {
      DataDataService.delete(this.currentData.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "datas" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getData(this.$route.params.id);
  }
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>