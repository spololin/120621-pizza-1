import { mapActions } from "vuex";
import { GET_ADDRESSES } from "@/store/mutation-types";

export default {
  created() {
    this.getAddresses();
  },
  methods: {
    ...mapActions("Addresses", {
      getAddresses: GET_ADDRESSES,
    }),
  },
};
