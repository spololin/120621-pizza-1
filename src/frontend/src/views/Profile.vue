<template>
  <main class="layout">
    <div class="layout__content">
      <ProfileTitle />
      <ProfileUserInfo />
      <ProfileAddress
        v-for="address in addresses"
        :key="address.id"
        :address="address"
      />
      <ProfileEditAddress v-if="expandAddressForm" />
      <ProfileAddAddress />
    </div>
  </main>
</template>

<script>
import ProfileUserInfo from "@/modules/profile/ProfileUserInfo";
import ProfileAddress from "@/modules/profile/ProfileAddress";
import ProfileEditAddress from "@/modules/profile/ProfileEditAddress";
import ProfileTitle from "@/modules/profile/ProfileTitle";
import ProfileAddAddress from "@/modules/profile/ProfileAddAddress";
import { mapActions, mapState } from "vuex";
import { GET_ADDRESSES } from "@/store/mutation-types";
export default {
  name: "Profile",
  components: {
    ProfileAddAddress,
    ProfileTitle,
    ProfileEditAddress,
    ProfileAddress,
    ProfileUserInfo,
  },
  computed: {
    ...mapState("Addresses", ["expandAddressForm", "addresses"]),
  },
  created() {
    this.getAddresses();
  },
  methods: {
    ...mapActions("Addresses", {
      getAddresses: GET_ADDRESSES,
    }),
  },
};
</script>
