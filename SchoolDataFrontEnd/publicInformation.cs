using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolDataFrontEnd
{
    public class PublicInformation
    {
        class User
        {
            string userName;
            string password;
            string realName;
            string e_mail;
            string mobliePhone;
            string userFolderFTP;
            string id;

            public void setUserName(string username) { this.userName = username; }
            public string getUserName() { return userName; }

            public void setPassword(string password) { this.password = password; }
            public string getPassword() { return password; }

            public void setrealName(string realName) { this.realName = realName; }
            public string getRealName() { return realName; }

            public void setE_mail(string e_mail) { this.e_mail = e_mail; }
            public string getE_mail() { return e_mail; }

            public void setMobliePhone(string mobliePhone) { this.mobliePhone = mobliePhone; }
            public string getMobliePhone() { return mobliePhone; }

            public void setUserFolderFTP(string userFolderFTP) { this.userFolderFTP = userFolderFTP; }
            public string getUserFolderFTP() { return userFolderFTP; }

            public void setId(string id) { this.id = id; }
            public string getId() { return id; }
        }
    }
}