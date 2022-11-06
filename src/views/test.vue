<template>
    <div>
        <h1>{{ this.msg }}</h1>
    </div>
</template>
 
<script>
import axios from "axios";
export default {
    name: "Test",
    data() {
        return {
            msg: "",
        };
    },
    created() {
        axios
            .get("/server/test")
            .then((res) => {
                this.msg = res.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang = "less" scoped>
h1,
h2 {
    font-weight: normal;
}
</style>
 