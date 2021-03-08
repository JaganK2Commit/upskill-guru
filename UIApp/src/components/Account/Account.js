import React from "react";
import styled, { css } from "styled-components";
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import EntypoIcon from "react-native-vector-icons/dist/Entypo";
import IoniconsIcon from "react-native-vector-icons/dist/Ionicons";

function Account(props) {
  return (
    <>
      <Rect>
        <UpSkillGuruRow>
          <UpSkillGuru>UpSkillGuru</UpSkillGuru>
          <EntypoIcon
            name="user"
            style={{
              color: "rgba(255,255,255,1)",
              fontSize: 40,
              height: 44,
              width: 40,
              marginLeft: 898
            }}
          ></EntypoIcon>
          <UserName>User Name</UserName>
        </UpSkillGuruRow>
      </Rect>
      <UsernameRow>
        <Username>Username</Username>
        <UsersUsernameStack>
          <UsersUsername>User&#39;s username</UsersUsername>
          <Rect2></Rect2>
        </UsersUsernameStack>
      </UsernameRow>
      <YourProfile>Your profile</YourProfile>
      <FullName1Row>
        <FullName1>Full Name</FullName1>
        <UsersFullNameStack>
          <UsersFullName>User&#39;s full name</UsersFullName>
          <Rect3></Rect3>
        </UsersFullNameStack>
      </FullName1Row>
      <LocationRow>
        <Location>Location</Location>
        <UsersLocationStack>
          <UsersLocation>User&#39;s location</UsersLocation>
          <Rect4></Rect4>
        </UsersLocationStack>
      </LocationRow>
      <SkillsRow>
        <Skills>Skills</Skills>
        <Skill1>Skill 1</Skill1>
      </SkillsRow>
      <EmailRow>
        <Email>Email</Email>
        <Email2Stack>
          <Email2>email</Email2>
          <Rect5></Rect5>
        </Email2Stack>
      </EmailRow>
      <Skill2>Skill 2</Skill2>
      <Skill32Stack>
        <Skill32>Skill 3</Skill32>
        <Rect6Stack>
          <Rect6>
            <AddNewSkill>Add new skill</AddNewSkill>
          </Rect6>
          <IoniconsIcon
            name="md-arrow-dropdown"
            style={{
              top: 0,
              left: 147,
              position: "absolute",
              color: "rgba(128,128,128,1)",
              fontSize: 38
            }}
          ></IoniconsIcon>
        </Rect6Stack>
      </Skill32Stack>
      <Rect7>
        <Save>SAVE</Save>
      </Rect7>
      <ChangeYourPassword>Change your password</ChangeYourPassword>
      <ConfirmRow>
        <Confirm>Confirm</Confirm>
        <Rect8>
          <ConfirmNewPassword>Confirm new password</ConfirmNewPassword>
        </Rect8>
      </ConfirmRow>
      <NewPasswordRow>
        <NewPassword>New Password</NewPassword>
        <Rect9>
          <EnterNewPassword>Enter new password</EnterNewPassword>
        </Rect9>
      </NewPasswordRow>
      <Rect10>
        <Save1>SAVE</Save1>
      </Rect10>
      <DeleteAccount>Delete Account</DeleteAccount>
    </>
  );
}

const Rect = styled.div`
  width: 1366px;
  height: 84px;
  background-color: rgba(74,144,226,1);
  flex-direction: row;
  display: flex;
  margin-left: -1px;
`;

const UpSkillGuru = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  font-size: 26px;
  margin-top: 6px;
`;

const UserName = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  font-size: 20px;
  margin-left: 23px;
  margin-top: 9px;
`;

const UpSkillGuruRow = styled.div`
  height: 44px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-right: 93px;
  margin-left: 79px;
  margin-top: 20px;
`;

const Username = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 16px;
  margin-top: 5px;
`;

const UsersUsername = styled.span`
  font-family: Roboto;
  top: 7px;
  left: 8px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: rgba(74,74,74,1);
`;

const Rect2 = styled.div`
  top: 0px;
  left: 0px;
  width: 197px;
  height: 30px;
  position: absolute;
  background-color: rgba(230,230, 230,0);
  border-width: 1px;
  border-color: #000000;
  border-style: solid;
`;

const UsersUsernameStack = styled.div`
  width: 197px;
  height: 30px;
  margin-left: 12px;
  position: relative;
`;

const UsernameRow = styled.div`
  height: 30px;
  flex-direction: row;
  display: flex;
  margin-top: 58px;
  margin-left: 372px;
  margin-right: 712px;
`;

const YourProfile = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  font-size: 20px;
  margin-top: -67px;
  margin-left: 322px;
`;

const FullName1 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 16px;
  margin-top: 4px;
`;

const UsersFullName = styled.span`
  font-family: Roboto;
  top: 6px;
  left: 8px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: rgba(74,74,74,1);
`;

const Rect3 = styled.div`
  top: 0px;
  left: 0px;
  width: 197px;
  height: 30px;
  position: absolute;
  background-color: rgba(230,230, 230,0);
  border-width: 1px;
  border-color: #000000;
  border-style: solid;
`;

const UsersFullNameStack = styled.div`
  width: 197px;
  height: 30px;
  margin-left: 12px;
  position: relative;
`;

const FullName1Row = styled.div`
  height: 30px;
  flex-direction: row;
  display: flex;
  margin-top: 59px;
  margin-left: 372px;
  margin-right: 712px;
`;

const Location = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 16px;
  margin-top: 6px;
`;

const UsersLocation = styled.span`
  font-family: Roboto;
  top: 6px;
  left: 8px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: rgba(74,74,74,1);
`;

const Rect4 = styled.div`
  top: 0px;
  left: 0px;
  width: 197px;
  height: 30px;
  position: absolute;
  background-color: rgba(230,230, 230,0);
  border-width: 1px;
  border-color: #000000;
  border-style: solid;
`;

const UsersLocationStack = styled.div`
  width: 197px;
  height: 30px;
  margin-left: 14px;
  position: relative;
`;

const LocationRow = styled.div`
  height: 30px;
  flex-direction: row;
  display: flex;
  margin-top: 16px;
  margin-left: 380px;
  margin-right: 712px;
`;

const Skills = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 16px;
`;

const Skill1 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  margin-left: 26px;
  margin-top: 4px;
`;

const SkillsRow = styled.div`
  height: 21px;
  flex-direction: row;
  display: flex;
  margin-top: 65px;
  margin-left: 400px;
  margin-right: 864px;
`;

const Email = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 16px;
  margin-top: 6px;
`;

const Email2 = styled.span`
  font-family: Roboto;
  top: 6px;
  left: 8px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: rgba(74,74,74,1);
`;

const Rect5 = styled.div`
  top: 0px;
  left: 0px;
  width: 197px;
  height: 30px;
  position: absolute;
  background-color: rgba(230,230, 230,0);
  border-width: 1px;
  border-color: #000000;
  border-style: solid;
`;

const Email2Stack = styled.div`
  width: 197px;
  height: 30px;
  margin-left: 18px;
  position: relative;
`;

const EmailRow = styled.div`
  height: 30px;
  flex-direction: row;
  display: flex;
  margin-top: -72px;
  margin-left: 399px;
  margin-right: 712px;
`;

const Skill2 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  margin-top: 48px;
  margin-left: 465px;
`;

const Skill32 = styled.span`
  font-family: Roboto;
  top: 0px;
  left: 8px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: #121212;
`;

const Rect6 = styled.div`
  top: 12px;
  left: 0px;
  width: 167px;
  height: 20px;
  position: absolute;
  background-color: rgba(244,244,244,1);
  flex-direction: column;
  display: flex;
`;

const AddNewSkill = styled.span`
  font-family: Roboto;
  font-style: italic;
  font-weight: ;
  color: rgba(74,74,74,1);
  margin-top: 2px;
  margin-left: 7px;
`;

const Rect6Stack = styled.div`
  top: 12px;
  left: 0px;
  width: 167px;
  height: 41px;
  position: absolute;
`;

const Skill32Stack = styled.div`
  width: 167px;
  height: 53px;
  margin-top: 7px;
  margin-left: 457px;
  position: relative;
`;

const Rect7 = styled.div`
  width: 130px;
  height: 29px;
  background-color: rgba(74,144,226,1);
  border-width: 1px;
  border-color: rgba(255,255,255,1);
  border-radius: 27px;
  border-style: solid;
  flex-direction: column;
  display: flex;
  margin-top: 11px;
  margin-left: 457px;
`;

const Save = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  margin-top: 6px;
  margin-left: 48px;
`;

const ChangeYourPassword = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  font-size: 20px;
  margin-top: 39px;
  margin-left: 322px;
`;

const Confirm = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 16px;
  margin-top: 6px;
`;

const Rect8 = styled.div`
  width: 197px;
  height: 30px;
  background-color: rgba(230,230, 230,0);
  border-width: 1px;
  border-color: #000000;
  flex-direction: column;
  display: flex;
  margin-left: 19px;
  border-style: solid;
`;

const ConfirmNewPassword = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(74,74,74,1);
  margin-top: 6px;
  margin-left: 10px;
`;

const ConfirmRow = styled.div`
  height: 30px;
  flex-direction: row;
  display: flex;
  margin-top: 70px;
  margin-left: 380px;
  margin-right: 712px;
`;

const NewPassword = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 16px;
  margin-top: 5px;
`;

const Rect9 = styled.div`
  width: 197px;
  height: 30px;
  background-color: rgba(230,230, 230,0);
  border-width: 1px;
  border-color: #000000;
  flex-direction: column;
  display: flex;
  margin-left: 18px;
  border-style: solid;
`;

const EnterNewPassword = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(74,74,74,1);
  margin-top: 5px;
  margin-left: 8px;
`;

const NewPasswordRow = styled.div`
  height: 30px;
  flex-direction: row;
  display: flex;
  margin-top: -74px;
  margin-left: 332px;
  margin-right: 712px;
`;

const Rect10 = styled.div`
  width: 130px;
  height: 29px;
  background-color: rgba(74,144,226,1);
  border-width: 1px;
  border-color: rgba(255,255,255,1);
  border-radius: 27px;
  border-style: solid;
  flex-direction: column;
  display: flex;
  margin-top: 68px;
  margin-left: 457px;
`;

const Save1 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  margin-top: 6px;
  margin-left: 48px;
`;

const DeleteAccount = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: rgba(227,3,3,1);
  font-size: 16px;
  margin-top: 23px;
  margin-left: 468px;
`;

export default Account;
