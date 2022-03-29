<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="city">City</label>
        <input
          type="text"
          class="form-control"
          id="city"
          required
          v-model="data.city"
          name="city"
        />
      </div>
      <div class="form-group">
        <label for="district">District</label>
        <input
          class="form-control"
          id="district"
          required
          v-model="data.district"
          name="district"
        />
      </div>
      <button @click="saveData" class="btn btn-success">Submit</button>
    </div>
    <div v-else>
      <h4>You submitted successfully</h4>
      <button class="btn btn-success" @click="newData">Add</button>
    </div>
  </div>
</template>
<script>
import DataDataService from "../services/DataDataService";
export default {
  name: "add-data",
  data() {
    return {
      data: {
        id: null,
        city: "",
        district: "",
      },
      submitted: false
    };
  },
  methods: {
    saveData() {
      var data = {
        city: this.data.city,
        district: this.data.district
      };
      DataDataService.create(data)
        .then(response => {
          this.data.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newData() {
      this.submitted = false;
      this.data = {};
    }
  }
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>