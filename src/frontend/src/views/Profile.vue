<template>
  <main class="layout">
    <div class="layout__content">
      <ProfileTitle />
      <ProfileUserInfo />
      <ProfileAddress />
      <ProfileEditAddress />
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
export default {
  name: "Profile",
  components: {
    ProfileAddAddress,
    ProfileTitle,
    ProfileEditAddress,
    ProfileAddress,
    ProfileUserInfo,
  },
};
</script>
