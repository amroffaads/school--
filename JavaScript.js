function CheckForm() {
    var uName = document.getElementById("uName").value;
    if (!userNameOK(uName))
        return false;

    var fName = document.getElementById("fName").value;
    if (!arabicNameOK(fName)) {
        showMessage("mFName", "الاسم الشخصي يجب أن يكون بالعربية وعلى الأقل حرفين");
        return false;
    }
    hideMessage("mFName");

    var lName = document.getElementById("lName").value;
    if (!arabicNameOK(lName)) {
        showMessage("mLName", "اسم العائلة يجب أن يكون بالعربية وعلى الأقل حرفين");
        return false;
    }
    hideMessage("mLName");

    var email = document.getElementById("email").value;
    if (!emailOK(email))
        return false;

    var phone = document.getElementById("phoneNum").value;
    if (phone.length < 7 || isNaN(phone)) {
        showMessage("mPhone", "رقم الهاتف غير صحيح");
        return false;
    }
    hideMessage("mPhone");

    var city = document.getElementById("mCity").value;
    if (city == "") {
        showMessage("mCityMessage", "الرجاء اختيار المدينة");
        return false;
    }
    hideMessage("mCityMessage");

    var hobies = document.getElementsByName("hobies");
    var hobiesChecked = false;
    for (var i = 0; i < hobies.length; i++) {
        if (hobies[i].checked)
            hobiesChecked = true;
    }
    if (!hobiesChecked) {
        showMessage("mHobies", "الرجاء اختيار مجال واحد على الأقل");
        return false;
    }
    hideMessage("mHobies");

    var gender = document.getElementsByName("gender");
    if (!chkRadioButton(gender)) {
        showMessage("mGender", "الرجاء اختيار الجنس");
        return false;
    }
    hideMessage("mGender");

    var yearBorn = document.getElementById("yearBorn").value;
    if (!yearBirthOK(yearBorn))
        return false;

    var pw = document.getElementById("pw").value;
    var pw1 = document.getElementById("rePassword").value;
    if (pw.length < 6 || pw.length > 8) {
        showMessage("mPassword", "كلمة المرور يجب أن تكون بين 6 و 8 رموز");
        return false;
    }
    if (pw != pw1) {
        showMessage("mPassword", "كلمة المرور لا تطابق التأكيد");
        return false;
    }
    hideMessage("mPassword");

    return true;
}

function CheckLogin() {
    var uName = document.getElementById("uName").value;
    if (!userNameOK(uName))
        return false;

    var pw = document.getElementById("pw").value;
    if (pw == "") {
        showMessage("mPassword", "الرجاء إدخال كلمة المرور");
        return false;
    }
    hideMessage("mPassword");

    return true;
}

function userNameOK(name) {
    var msg = "";

    if (name.length < 3)
        msg = "اسم المستخدم قصير، على الأقل 3 أحرف أو أرقام";
    else if (name.length > 30)
        msg = "اسم المستخدم طويل، على الأكثر 30 حرف";
    else if (!arabicUserNameOK(name))
        msg = "اسم المستخدم يجب أن يكون بالعربية أو أرقام فقط";

    if (msg != "") {
        showMessage("mUName", msg);
        return false;
    }

    hideMessage("mUName");
    return true;
}

function emailOK(email) {
    var msg = "";
    var atSign = email.indexOf("@");
    var dotSign = email.lastIndexOf(".");

    if (email.length < 6)
        msg = "البريد الإلكتروني قصير أو غير موجود";
    else if (email.length > 30)
        msg = "البريد الإلكتروني يجب أن يكون بين 6 و 30 حرف";
    else if (isHebrew(email) || isArabic(email) || email.indexOf(" ") != -1)
        msg = "البريد الإلكتروني غير صحيح";
    else if (atSign == -1 || atSign != email.lastIndexOf("@"))
        msg = "البريد الإلكتروني يجب أن يحتوي على @ واحد فقط";
    else if (dotSign == -1 || dotSign - atSign < 2 || dotSign == email.length - 1)
        msg = "البريد الإلكتروني غير صحيح";

    if (msg != "") {
        showMessage("mEmail", msg);
        return false;
    }

    hideMessage("mEmail");
    return true;
}

function arabicUserNameOK(str) {
    for (var i = 0; i < str.length; i++) {
        var ch = str.charAt(i);
        if (!((ch >= "ء" && ch <= "ي") || (ch >= "0" && ch <= "9") || (ch >= "٠" && ch <= "٩")))
            return false;
    }
    return true;
}

function arabicNameOK(str) {
    if (str.length < 2)
        return false;

    for (var i = 0; i < str.length; i++) {
        var ch = str.charAt(i);
        if (!((ch >= "ء" && ch <= "ي") || ch == " "))
            return false;
    }
    return true;
}

function isArabic(str) {
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) >= "ء" && str.charAt(i) <= "ي")
            return true;
    }
    return false;
}

function isHebrew(str) {
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) >= "א" && str.charAt(i) <= "ת")
            return true;
    }
    return false;
}

function chkRadioButton(gender) {
    for (var i = 0; i < gender.length; i++) {
        if (gender[i].checked)
            return true;
    }
    return false;
}

function yearBirthOK(year) {
    var currentYear = new Date().getFullYear();
    var old = currentYear - 100;
    var young = currentYear - 10;

    if (year == "" || isNaN(year) || year < old || year > young) {
        showMessage("mYearBorn", "سنة الميلاد غير صحيحة");
        return false;
    }

    hideMessage("mYearBorn");
    return true;
}

function showMessage(id, msg) {
    var element = document.getElementById(id);
    element.value = msg;
    element.style.display = "inline";
}

function hideMessage(id) {
    document.getElementById(id).style.display = "none";
}
