<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by city"
          v-model="city"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchCity"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Data List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(data, index) in datas"
          :key="index"
          @click="setActiveData(data, index)"
        >
          {{ data.city }}
        </li>
      </ul>
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllDatas">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentData">
        <h4>Data</h4>
        <div>
          <label><strong>Data:</strong></label> {{ currentData.data }}
        </div>
        <div>
          <label><strong>district:</strong></label> {{ currentData.district }}
        </div>
        
        <router-link :to="'/datas/' + currentData.id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Data...</p>
      </div>
    </div>
  </div>
</template>
<script>
import DataDataService from "../services/DataDataService";
export default {
  name: "datas-list",
  data() {
    return {
      datas: [],
      currentData: null,
      currentIndex: -1,
      city: ""
    };
  },
  methods: {
    retriveDatas() {
      DataDataService.getAll()
        .then(response => {
          this.datas = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retriveDatas();
      this.currentData = null;
      this.currentIndex = -1;
    },
    setActiveData(data, index) {
      this.currentData = data;
      this.currentIndex = data ? index : -1;
    },
    removeAllDatas() {
      DataDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchCity() {
      DataDataService.findByCity(this.city)
        .then(response => {
          this.datas = response.data;
          this.setActiveData(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retriveDatas();
  }
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>