import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import IoniconsIcon from "react-native-vector-icons/Ionicons";

function Account(props) {
  return (
    <View style={styles.container}>
      <View style={styles.rect}>
        <View style={styles.upSkillGuruRow}>
          <Text style={styles.upSkillGuru}>UpSkillGuru</Text>
          <EntypoIcon name="user" style={styles.icon}></EntypoIcon>
          <Text style={styles.userName}>User Name</Text>
        </View>
      </View>
      <View style={styles.usernameRow}>
        <Text style={styles.username}>Username</Text>
        <View style={styles.usersUsernameStack}>
          <Text style={styles.usersUsername}>User&#39;s username</Text>
          <View style={styles.rect2}></View>
        </View>
      </View>
      <Text style={styles.yourProfile}>Your profile</Text>
      <View style={styles.fullName1Row}>
        <Text style={styles.fullName1}>Full Name</Text>
        <View style={styles.usersFullNameStack}>
          <Text style={styles.usersFullName}>User&#39;s full name</Text>
          <View style={styles.rect3}></View>
        </View>
      </View>
      <View style={styles.locationRow}>
        <Text style={styles.location}>Location</Text>
        <View style={styles.usersLocationStack}>
          <Text style={styles.usersLocation}>User&#39;s location</Text>
          <View style={styles.rect4}></View>
        </View>
      </View>
      <View style={styles.skillsRow}>
        <Text style={styles.skills}>Skills</Text>
        <Text style={styles.skill1}>Skill 1</Text>
      </View>
      <View style={styles.emailRow}>
        <Text style={styles.email}>Email</Text>
        <View style={styles.email2Stack}>
          <Text style={styles.email2}>email</Text>
          <View style={styles.rect5}></View>
        </View>
      </View>
      <Text style={styles.skill2}>Skill 2</Text>
      <View style={styles.skill32Stack}>
        <Text style={styles.skill32}>Skill 3</Text>
        <View style={styles.rect6Stack}>
          <View style={styles.rect6}>
            <Text style={styles.addNewSkill}>Add new skill</Text>
          </View>
          <IoniconsIcon
            name="md-arrow-dropdown"
            style={styles.icon2}
          ></IoniconsIcon>
        </View>
      </View>
      <View style={styles.rect7}>
        <Text style={styles.save}>SAVE</Text>
      </View>
      <Text style={styles.changeYourPassword}>Change your password</Text>
      <View style={styles.confirmRow}>
        <Text style={styles.confirm}>Confirm</Text>
        <View style={styles.rect8}>
          <Text style={styles.confirmNewPassword}>Confirm new password</Text>
        </View>
      </View>
      <View style={styles.newPasswordRow}>
        <Text style={styles.newPassword}>New Password</Text>
        <View style={styles.rect9}>
          <Text style={styles.enterNewPassword}>Enter new password</Text>
        </View>
      </View>
      <View style={styles.rect10}>
        <Text style={styles.save1}>SAVE</Text>
      </View>
      <Text style={styles.deleteAccount}>Delete Account</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    width: 1366,
    height: 84,
    backgroundColor: "rgba(74,144,226,1)",
    flexDirection: "row",
    marginLeft: -1
  },
  upSkillGuru: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 26,
    marginTop: 6
  },
  icon: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    height: 44,
    width: 40,
    marginLeft: 898
  },
  userName: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    marginLeft: 23,
    marginTop: 9
  },
  upSkillGuruRow: {
    height: 44,
    flexDirection: "row",
    flex: 1,
    marginRight: 93,
    marginLeft: 79,
    marginTop: 20
  },
  username: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 16,
    marginTop: 5
  },
  usersUsername: {
    top: 7,
    left: 8,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(74,74,74,1)"
  },
  rect2: {
    top: 0,
    left: 0,
    width: 197,
    height: 30,
    position: "absolute",
    backgroundColor: "rgba(230,230, 230,0)",
    borderWidth: 1,
    borderColor: "#000000"
  },
  usersUsernameStack: {
    width: 197,
    height: 30,
    marginLeft: 12
  },
  usernameRow: {
    height: 30,
    flexDirection: "row",
    marginTop: 58,
    marginLeft: 372,
    marginRight: 712
  },
  yourProfile: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20,
    marginTop: -67,
    marginLeft: 322
  },
  fullName1: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 16,
    marginTop: 4
  },
  usersFullName: {
    top: 6,
    left: 8,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(74,74,74,1)"
  },
  rect3: {
    top: 0,
    left: 0,
    width: 197,
    height: 30,
    position: "absolute",
    backgroundColor: "rgba(230,230, 230,0)",
    borderWidth: 1,
    borderColor: "#000000"
  },
  usersFullNameStack: {
    width: 197,
    height: 30,
    marginLeft: 12
  },
  fullName1Row: {
    height: 30,
    flexDirection: "row",
    marginTop: 59,
    marginLeft: 372,
    marginRight: 712
  },
  location: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 16,
    marginTop: 6
  },
  usersLocation: {
    top: 6,
    left: 8,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(74,74,74,1)"
  },
  rect4: {
    top: 0,
    left: 0,
    width: 197,
    height: 30,
    position: "absolute",
    backgroundColor: "rgba(230,230, 230,0)",
    borderWidth: 1,
    borderColor: "#000000"
  },
  usersLocationStack: {
    width: 197,
    height: 30,
    marginLeft: 14
  },
  locationRow: {
    height: 30,
    flexDirection: "row",
    marginTop: 16,
    marginLeft: 380,
    marginRight: 712
  },
  skills: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 16
  },
  skill1: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 26,
    marginTop: 4
  },
  skillsRow: {
    height: 21,
    flexDirection: "row",
    marginTop: 65,
    marginLeft: 400,
    marginRight: 864
  },
  email: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 16,
    marginTop: 6
  },
  email2: {
    top: 6,
    left: 8,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(74,74,74,1)"
  },
  rect5: {
    top: 0,
    left: 0,
    width: 197,
    height: 30,
    position: "absolute",
    backgroundColor: "rgba(230,230, 230,0)",
    borderWidth: 1,
    borderColor: "#000000"
  },
  email2Stack: {
    width: 197,
    height: 30,
    marginLeft: 18
  },
  emailRow: {
    height: 30,
    flexDirection: "row",
    marginTop: -72,
    marginLeft: 399,
    marginRight: 712
  },
  skill2: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 48,
    marginLeft: 465
  },
  skill32: {
    top: 0,
    left: 8,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  rect6: {
    top: 12,
    left: 0,
    width: 167,
    height: 20,
    position: "absolute",
    backgroundColor: "rgba(244,244,244,1)"
  },
  addNewSkill: {
    fontFamily: "roboto-italic",
    color: "rgba(74,74,74,1)",
    marginTop: 2,
    marginLeft: 7
  },
  icon2: {
    top: 0,
    left: 147,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 38
  },
  rect6Stack: {
    top: 12,
    left: 0,
    width: 167,
    height: 41,
    position: "absolute"
  },
  skill32Stack: {
    width: 167,
    height: 53,
    marginTop: 7,
    marginLeft: 457
  },
  rect7: {
    width: 130,
    height: 29,
    backgroundColor: "rgba(74,144,226,1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 27,
    borderStyle: "solid",
    marginTop: 11,
    marginLeft: 457
  },
  save: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 6,
    marginLeft: 48
  },
  changeYourPassword: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20,
    marginTop: 39,
    marginLeft: 322
  },
  confirm: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 16,
    marginTop: 6
  },
  rect8: {
    width: 197,
    height: 30,
    backgroundColor: "rgba(230,230, 230,0)",
    borderWidth: 1,
    borderColor: "#000000",
    marginLeft: 19
  },
  confirmNewPassword: {
    fontFamily: "roboto-regular",
    color: "rgba(74,74,74,1)",
    marginTop: 6,
    marginLeft: 10
  },
  confirmRow: {
    height: 30,
    flexDirection: "row",
    marginTop: 70,
    marginLeft: 380,
    marginRight: 712
  },
  newPassword: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 16,
    marginTop: 5
  },
  rect9: {
    width: 197,
    height: 30,
    backgroundColor: "rgba(230,230, 230,0)",
    borderWidth: 1,
    borderColor: "#000000",
    marginLeft: 18
  },
  enterNewPassword: {
    fontFamily: "roboto-regular",
    color: "rgba(74,74,74,1)",
    marginTop: 5,
    marginLeft: 8
  },
  newPasswordRow: {
    height: 30,
    flexDirection: "row",
    marginTop: -74,
    marginLeft: 332,
    marginRight: 712
  },
  rect10: {
    width: 130,
    height: 29,
    backgroundColor: "rgba(74,144,226,1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 27,
    borderStyle: "solid",
    marginTop: 68,
    marginLeft: 457
  },
  save1: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 6,
    marginLeft: 48
  },
  deleteAccount: {
    fontFamily: "roboto-700",
    color: "rgba(227,3,3,1)",
    fontSize: 16,
    marginTop: 23,
    marginLeft: 468
  }
});

export default Account;