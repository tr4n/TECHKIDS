function sendAjax(e, t, n) {
    var i = new XMLHttpRequest;
    return i.open(e, t), i.setRequestHeader("X-Requested-With", "XMLHttpRequest"), i.setRequestHeader("Content-Type", "application/json"), "GET" != e && i.setRequestHeader("X-CSRF-TOKEN", _GLOBAL._TOKEN), i.withCredentials = !0, n ? i.send(JSON.stringify(n)) : i.send(), i
}

function getElement(e) {
    return document.querySelector(e)
}

function getAllElements(e) {
    return document.querySelectorAll(e)
}

function createElement(e, t, n, i, a) {
    var o = document.createElement(t);
    if (o.className = n, o.identity = e, i || (i = {}), a)
        for (var r = 0; r < a.length; r++) o.setAttribute(a[r].identity, a[r].value);
    if (i.innerHTML && (o.innerHTML = i.innerHTML), i.childrens)
        for (var r = 0; r < i.childrens.length; r++) {
            var l = createElement(i.childrens[r].identity, i.childrens[r].tag, i.childrens[r].className, i.childrens[r].options, i.childrens[r].properties);
            o.appendChild(l), o[i.childrens[r].identity] = l
        }
    return o
}

function createElementByJs(e, t, n, i, a) {
    var o = document.createElement(t);
    if (o.className = n, o.identity = e, i || (i = {}), a)
        for (var r = 0; r < a.length; r++) o.setAttribute(a[r].identity, a[r].value);
    if (i.innerHTML && (o.innerHTML = i.innerHTML), i.childrens)
        for (var r = 0; r < i.childrens.length; r++) {
            var l = createElementByJs(i.childrens[r].identity, i.childrens[r].tag, i.childrens[r].className, i.childrens[r].options, i.childrens[r].properties);
            o.appendChild(l), o[i.childrens[r].identity] = l
        }
    return o
}

function removeElement(e) {
    try {
        e.parentNode.removeChild(e)
    } catch (e) {}
}

function showLoginForm() {
    alertify.confirm("Chức năng này chỉ dành cho thành viên đã đăng nhập", function () {
        try {
            activeNavbarRight()
        } catch (e) {}
    })
}

function getTimeAgo(e) {
    var t = e.substring(0, 10);
    e = new Date(e).getTime();
    var n = (new Date).getTime(),
        i = (n - e) / 1e3;
    return i > 2592e3 ? (t = t.split("-"), t[2] + "-" + t[1] + "-" + t[0]) : i > 604800 ? Math.floor(i / 604800) + " tuần trước" : i > 86400 ? Math.floor(i / 86400) + " ngày trước" : i > 3600 ? Math.floor(i / 3600) + " giờ trước" : i > 60 ? Math.floor(i / 60) + " phút trước" : Math.floor(i) + " giây trước"
}

function getPageYOffset() {
    try {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    } catch (e) {
        return 0
    }
}

function getScrollPageType() {
    try {
        return document.body.scrollTop > 0 ? 1 : 2
    } catch (e) {}
    return 0
}

function scrollTo(e, t, n) {
    if (!(n <= 0)) {
        var i = t - e.scrollTop,
            a = i / n * 10;
        setTimeout(function () {
            e.scrollTop = e.scrollTop + a, e.scrollTop != t && scrollTo(e, t, n - 10)
        }, 10)
    }
}

function scrollPageTo(e, t) {
    try {
        return void(document.body.scrollTop > 0 ? scrollTo(document.body, e, t) : scrollTo(document.documentElement, e, t))
    } catch (e) {}
    window.scrollTo(0, e)
}

function setFilmItem(e, t) {
    t || (t = {});
    var n = document.createElement("div");
    n.className = "tray-item";
    for (var i = '<div class="tray-film-genres">', a = 0; a < e.genres.data.length; a++) i += "<span>" + e.genres.data[a].name + "</span>", a + 1 < e.genres.data.length && (i += ",&nbsp;");
    i += "</div>";
    var o = '<div class="tray-film-update">';
    e.is_movie ? o += e.time : o += e.meta.max_episode_name + " / " + e.time, o += "</div>";
    var r = "";
    return e.upcoming && (r = '<div class="tray-item-upcoming">SẮP CHIẾU</div>'), n.innerHTML = '<a href="/' + e.slug + '"><img class="tray-item-thumbnail" src="' + e.thumbnail + '"><div class="tray-item-description"><div class="tray-item-title">' + e.name + '</div><div class="tray-item-meta-info"><div class="tray-film-views">' + e.views.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ' lượt xem</div><div class="tray-film-likes">' + e.likes.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " thích</div></div></div>" + i + o + '<div class="tray-item-play-button"><i class="icon-play"></i></div>' + r + "</a>", n
}

function clickOnTab(e) {
    e.onclick = function () {
        for (var t = getAllElements(".navbar-user-body"), n = e.getAttribute("data-tab"), i = getElement(".tab-" + n), a = t.length - 1; a >= 0; a--) t[a].classList.add("hidden");
        for (var a = navbarTab.children.length - 1; a >= 0; a--) navbarTab.children[a].classList.remove("activated");
        e.classList.add("activated"), i.classList.remove("hidden"), ismobile.any || Ps.update(i)
    }
}

function activeNavbarLeft() {
    navbarLeft.classList.add("activated"), navbarRight.classList.remove("activated"), floatingAction.classList.remove("activated"), actionToggle.innerHTML = '<i class="icon-assistive"></i>', navbar.style.zIndex = "8888"
}

function activeNavbarRight() {
    navbarRight.classList.add("activated"), navbarLeft.classList.remove("activated"), floatingAction.classList.remove("activated"), actionToggle.innerHTML = '<i class="icon-assistive"></i>', navbar.style.zIndex = "8888"
}

function lockScroll() {}

function unlockScroll() {}

function closeNavbar(e) {
    var t = 0,
        n = e.target;
    "ok" != n.className && (navbarLeft.contains(n) || navbarToggle.contains(n) || actionMenu.contains(n) || (navbarLeft.classList.remove("activated"), t++), navbarRight.contains(n) || navbarUser.contains(n) || actionUser.contains(n) || (navbarRight.classList.remove("activated"), t++), t > 1 && (navbar.style.zIndex = ""))
}

function hideSearchResult(e) {
    navbarSearch.contains(e.target) || searchResult.classList.remove("activated")
}

function hideFloatingAction() {
    if (!(window.innerWidth >= 1024)) return window.innerHeight > window.innerWidth || getPageYOffset() > 100 ? void floatingAction.classList.remove("hidden") : void floatingAction.classList.add("hidden")
}

function setMenuHeight() {
    if (!ismobile.any) return void(navbarMenu.style = "");
    var e = window.innerHeight - 120;
    navbarMenu.style.maxHeight = e + "px", navbarMenu.style.overflow = "auto"
}

function navbarOnload() {
    setMenuHeight(), hideFloatingAction()
}

function checkSearchResult() {
    getAllElements(".result-item").length || (searchLoading.classList.add("hidden"), searchNoitem.classList.remove("hidden"), searchNoitem.innerHTML = "Nhập tên anime để tìm kiếm")
}

function searchFilms() {
    var e = searchBox.value;
    if (e = e.trim().replace(/\s{2,}/g, " "), (e = e.replace(/[&\/\\#,+()$~@$^%.'"*?<>{}]/g, "")) && e != oldQuery) {
        oldQuery = e, searchLoading.classList.remove("hidden");
        var t = sendAjax("GET", _GLOBAL._API + "/search?q=" + e + "&limit=12");
        t.onload = function () {
            if (200 == t.status || 304 == t.status) {
                var e = JSON.parse(t.responseText);
                return console.log(e), removeSearchResult(), void setSearchResult(e.data)
            }
            searchLoading.classList.add("hidden")
        }, t.onerror = function () {
            searchLoading.classList.add("hidden")
        }
    } else if (searchLoading.classList.add("hidden"), !e) return oldQuery = null, removeSearchResult(), void searchResult.classList.remove("activated")
}

function removeSearchResult() {
    searchResultBody.innerHTML = ""
}

function setSearchResult(e) {
    if (!e.length) return searchLoading.classList.add("hidden"), searchNoitem.classList.remove("hidden"), void(searchNoitem.innerHTML = "Không tìm thấy anime phù hợp");
    searchNoitem.classList.add("hidden");
    for (var t = 0; t < e.length; t++) {
        var n = document.createElement("div");
        n.className = "result-item", n.setAttribute("data-id", e[t].id), n.setAttribute("data-slug", e[t].slug), n.innerHTML = '<a href="/' + e[t].slug + '"><div class="result-item-thumbnail"><img src="' + e[t].thumbnail + '"></div><div class="result-item-meta"><div class="result-item-title">' + e[t].name + '</div><div class="result-item-time">' + (e[t].is_movie ? "" : (e[t].meta.max_episode_name ? e[t].meta.max_episode_name : 0) + " / ") + e[t].time + '</div><div class="result-item-views">' + e[t].views.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " lượt xem</div></div></a>", searchResultBody.appendChild(n)
    }
    scrollTo(searchResultBody, 0, 100), searchLoading.classList.add("hidden"), ismobile.any || Ps.update(searchResultBody)
}

function setSearchResultHeight() {
    if (window.innerWidth >= 1024) return void(searchResultBody.style.height = "");
    searchResultBody.style.height = window.innerHeight - 115 + "px"
}

function gotoResultPage(e) {
    if (e) return void(window.location = _GLOBAL._URL + "/" + e);
    var t = searchBox.value;
    t = t.trim().replace(/\s{2,}/g, " "), (t = t.replace(/[&\/\\#,+()$~!@$^%.'"*?<>{}]/g, "")) && (window.location = _GLOBAL._URL + "/tim-kiem/" + t)
}

function searchOnLoad() {
    ismobile.any ? searchResultBody.style.overflow = "auto" : Ps.initialize(searchResultBody, {
        minScrollbarLength: 50,
        maxScrollbarLength: 50
    }), setSearchResultHeight()
}

function setCoverImage(e, t) {
    var n = document.createElement("img");
    n.src = e.querySelector("img").src, sliders[t] = n, sliderCover.appendChild(n), hoverOnSliderItem(e)
}

function setActivatedItem(e) {
    var t = sliderCover.querySelectorAll("img");
    try {
        for (var n = 1; n < t.length; n++) t[n].src != e.querySelector("img").src ? t[n].classList.remove("activated") : t[n].classList.add("activated");
        sliderTitle.innerText = e.getAttribute("data-title"), sliderViews.innerText = e.getAttribute("data-views"), sliderLink.href = e.children[0].href
    } catch (e) {}
}

function hoverOnSliderItem(e) {
    e.onmouseover = function () {
        setActivatedItem(e)
    }
}

function createSliderItem() {
    var e = document.createElement("div");
    e.className = "slider-item hidden", e.setAttribute("data-title", sliderTitle.innerText), e.setAttribute("data-views", sliderViews.innerText), e.innerHTML = '<a href="' + sliderLink.href + '"><img class="slider-item-img" src="' + sliderFirstImg.src + '"></a>', e.onmouseover = function () {
        setActivatedItem(e)
    }, slider.appendChild(e)
}

function autoNextSlideItem() {
    sliderInterval = setInterval(function () {
        sliderItems = getAllElements(".slider-item");
        var e = sliderItems[0].cloneNode(!0);
        e.classList.add("hidden");
        for (var t = 0; t < sliders.length; t++) sliders[t].classList.remove("activated");
        sliderPosition >= sliders.length ? sliderPosition = -1 : sliders[sliderPosition].classList.add("activated"), slider.appendChild(e), sliderLink.href = sliderItems[0].children[0].href, sliderTitle.innerText = sliderItems[0].getAttribute("data-title"), sliderViews.innerText = sliderItems[0].getAttribute("data-views"), e.onmouseover = function () {
            setActivatedItem(e)
        }, removeElement(sliderItems[0]), sliderItems[sliderItems.length - 1].classList.remove("hidden"), sliderItems = getAllElements(".slider-item");
        for (var t = 0; t < sliders.length; t++) hoverOnSliderItem(sliders[t], t);
        sliderPosition++
    }, 1e4)
}

function uploadAvatar(e) {
    var t = new FormData;
    t.append("avatar", e);
    var n = new XMLHttpRequest;
    n.open("PUT", _GLOBAL._API + "/users/self/avatar"), n.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n.setRequestHeader("X-CSRF-TOKEN", _GLOBAL._TOKEN), n.withCredentials = !0, n.send(t), n.onload = function () {
        if (200 == n.status) {
            var e = JSON.parse(n.responseText);
            if (e.avatar) return userAvatar.src = e.avatar, getElement(".user-avatar.big-avatar img").src = e.avatar, void alertify.success("Đổi hình đại diện thành công!")
        }
    }, n.onerror = function () {}
}

function setLoginTabHeight() {
    var e = window.innerHeight - 120;
    loginTab.style.maxHeight = e + "px", signupTab.style.maxHeight = e + "px", ismobile.any && (loginTab.style.overflow = "auto", signupTab.style.overflow = "auto")
}

function setInfomationTabHeight() {
    var e = window.innerHeight - 120;
    informationBody.style.maxHeight = e + "px", notificationBody.style.maxHeight = e + "px", ismobile.any && (informationBody.style.overflow = "auto", notificationBody.style.overflow = "auto")
}

function validateLoginUsername() {
    var e = loginUsername.parentNode,
        t = e.querySelector(".tip");
    return loginUsername.value.length < 5 || loginUsername.value.length > 20 ? (t.innerText = "từ 6 - 20 kí tự", e.classList.add("warning"), !1) : (t.innerText = "", e.classList.remove("warning"), !0)
}

function validateSignupUsername() {
    var e = signupUsername.parentNode,
        t = e.querySelector(".tip");
    if (signupUsername.value.length < 6 || signupUsername.value.length > 20) return validated.username = !1, t.innerText = "từ 6 - 20 kí tự", void e.classList.add("warning");
    if (!validated.username || cachedValidate.username != signupUsername.value) {
        validated.username = !1, t.innerText = "";
        var n = sendAjax("GET", _GLOBAL._API + "/users/validate?username=" + signupUsername.value);
        n.onload = function () {
            if (200 == n.status || 304 == n.status) return cachedValidate.username = signupUsername.value, e.classList.remove("warning"), void(validated.username = !0);
            400 == n.status ? t.innerText = "không hợp lệ (bị cấm)" : 409 == n.status && (t.innerText = "đã tồn tại trong hệ thống"), validated.username = !1, cachedValidate.username = null, e.classList.add("warning")
        }
    }
}

function validatePassword(e) {
    var t = e.querySelector('input[name="password"]'),
        n = t.parentNode,
        i = n.querySelector(".tip");
    return t.value.length < 6 || t.value.length > 30 ? (validated.password = !1, i.innerText = "từ 6 - 30 kí tự", n.classList.add("warning"), !1) : (validated.password = !0, i.innerText = "", n.classList.remove("warning"), !0)
}

function validatePasswordConfirm() {
    var e = passwordConfirm.parentNode,
        t = e.querySelector(".tip");
    if (signupPassword.value != passwordConfirm.value) return validated.passwordConfirm = !1, t.innerText = "2 mật khẩu không khớp", void e.classList.add("warning");
    validated.passwordConfirm = !0, t.innerText = "", e.classList.remove("warning")
}

function validateFullName() {
    var e = fullName.parentNode,
        t = e.querySelector(".tip");
    if (fullName.value.length < 5 || fullName.value.length > 40) return validated.fullName = !1, t.innerText = "từ 8 - 40 kí tự", void e.classList.add("warning");
    if (!validated.fullName || cachedValidate.fullName != fullName.value) {
        validated.fullName = !1, t.innerText = "";
        var n = sendAjax("GET", _GLOBAL._API + "/users/validate?full_name=" + fullName.value);
        n.onload = function () {
            if (200 == n.status || 304 == n.status) return cachedValidate.fullName = fullName.value, e.classList.remove("warning"), void(validated.fullName = !0);
            400 == n.status ? t.innerText = "không hợp lệ (bị cấm)" : t.innerText = "hãy thử lại", validated.fullName = !1, cachedValidate.fullName = null, e.classList.add("warning")
        }
    }
}

function validateEmail() {
    var e = email.parentNode,
        t = e.querySelector(".tip");
    if (email.value.length < 8) return validated.email = !1, t.innerText = "email không hợp lệ", void e.classList.add("warning");
    if (!validated.email || cachedValidate.email != email.value) {
        validated.email = !1, t.innerText = "";
        var n = sendAjax("GET", _GLOBAL._API + "/users/validate?email=" + email.value);
        n.onload = function () {
            if (200 == n.status || 304 == n.status) return validated.email = !0, cachedValidate.email = email.value, void e.classList.remove("warning");
            400 == n.status ? t.innerText = "email không hợp lệ" : 409 == n.status && (t.innerText = "email đã tồn tại"), validated.email = !1, cachedValidate.email = null, e.classList.add("warning")
        }
    }
}

function validateBirthDate(e) {
    var t = formGroupBirthday.querySelector(".tip");
    return birthDate.value < 1 || birthDate.value > 31 ? (validated.birthDate = !1, t.innerText = "chọn ngày sinh từ 1 - 31", formGroupBirthday.classList.add("warning"), !1) : (validated.birthDate = !0, t.innerText = "", formGroupBirthday.classList.remove("warning"), !e && validated.birthMonth && validated.birthYear && validateBirthday(!0), !0)
}

function validateBirthMonth(e) {
    var t = formGroupBirthday.querySelector(".tip");
    return birthMonth.value < 1 || birthMonth.value > 12 ? (validated.birthMonth = !1, t.innerText = "chọn tháng sinh từ 1 - 12", formGroupBirthday.classList.add("warning"), !1) : (validated.birthMonth = !0, t.innerText = "", formGroupBirthday.classList.remove("warning"), !e && validated.birthDate && validated.birthYear && validateBirthday(!0), !0)
}

function validateBirthYear(e) {
    var t = formGroupBirthday.querySelector(".tip");
    return birthYear.value < 1970 || birthYear.value > 2010 ? (validated.birthYear = !1, t.innerText = "chọn năm sinh từ 1970 - 2010", formGroupBirthday.classList.add("warning"), !1) : (validated.birthYear = !0, t.innerText = "", formGroupBirthday.classList.remove("warning"), !e && validated.birthDate && validated.birthMonth && validateBirthday(!0), !0)
}

function validateBirthday(e) {
    if (e || validateBirthDate(!0) && validateBirthMonth(!0) && validateBirthYear(!0)) {
        var t = formGroupBirthday.querySelector(".tip"),
            n = parseInt(birthDate.value) + "-" + parseInt(birthMonth.value) + "-" + parseInt(birthYear.value),
            i = new Date(birthYear.value + "-" + birthMonth.value + "-" + birthDate.value);
        try {
            if (i.getDate() != parseInt(birthDate.value) || i.getMonth() + 1 != parseInt(birthMonth.value) || i.getFullYear() != parseInt(birthYear.value)) return validated.birthday = !1, cachedValidate.birthday = null, t.innerText = "ngày " + n + " không hợp lệ", void formGroupBirthday.classList.add("warning");
            validated.birthday = !0, cachedValidate.birthday = n
        } catch (e) {
            if (validated.birthday && cachedValidate.birthday == n) return;
            t.innerText = "", validated.birthday = !1;
            var a = sendAjax("GET", _GLOBAL._API + "/users/validate?birthday=" + n);
            a.onload = function () {
                if (200 == a.status || 304 == a.status) return validated.birthday = !0, cachedValidate.birthday = n, void formGroupBirthday.classList.remove("warning");
                validated.birthday = !1, cachedValidate.birthday = null, t.innerText = "ngày " + n + " không hợp lệ", formGroupBirthday.classList.add("warning")
            }
        }
    }
}

function getNotifications(e) {
    var t = getAllElements(".notification-item"),
        n = getElement(".notification-none"),
        i = t.length;
    if (e || (e = {}, !i)) {
        if (navbarLoading.classList.remove("hidden"), cachedNotifications.submitted) {
            if ((new Date).getTime() - cachedNotifications.submitted < 3e5) return n.classList.remove("hidden"), n.innerText = "Không có thông báo", void navbarLoading.classList.add("hidden")
        } else {
            var a = store.get("notifications");
            if (a && (new Date).getTime() - a.submitted < 3e5) return n.classList.remove("hidden"), n.innerText = "Không có thông báo", void navbarLoading.classList.add("hidden")
        }
        var o = sendAjax("GET", _GLOBAL._API + "/users/self/notifications?offset=" + i);
        o.onload = function () {
            if (200 == o.status) {
                var e = JSON.parse(o.responseText);
                i += e.data.length;
                for (var t = 0; t < e.data.length; t++) notificationList.appendChild(setNotificationItem(e.data[t]));
                if (!i) {
                    n.classList.remove("hidden"), n.innerText = "Không có thông báo", navbarLoading.classList.add("hidden"), cachedNotifications = e, cachedNotifications.submitted = (new Date).getTime();
                    try {
                        store.set("notifications", cachedNotifications)
                    } catch (e) {}
                    return
                }
                n.classList.add("hidden"), cachedNotifications = {};
                try {
                    store.remove("notifications")
                } catch (e) {}
                i >= e.total ? notificationMore.classList.add("hidden") : notificationMore.classList.remove("hidden")
            }
            navbarLoading.classList.add("hidden")
        }, o.onerror = function () {
            navbarLoading.classList.add("hidden")
        }
    }
}

function setNotificationItem(e) {
    var t = document.createElement("div");
    return t.className = "notification-item", t.setAttribute("data-id", e.id), t.innerHTML = '<a href="/' + e.link + '"><div class="notification-item-thumbnail"><img src="' + e.thumbnail + '"></div></a><div class="notification-item-body"><a href="/' + e.link + '"><div class="notification-item-title">' + e.content + '</div></a><div class="notification-item-time"><i class="icon icon-time"></i>' + getTimeAgo(e.created_at) + "</div></div>", t
}

function clearSignupForm() {
    for (var e = document.querySelector(".navbar-user-body.tab-signup").querySelectorAll('input[type="text"], input[type="password"], input[type="number"]'), t = e.length - 1; t >= 0; t--) e[t].value = "";
    validated = {}, cachedValidate = {}
}

function signup() {
    var e = document.querySelector("#form-signup-warning");
    if (e.parentNode.classList.add("hidden"), e.innerHTML = "", navbarLoading.classList.remove("hidden"), signupButton.classList.add("disabled"), validateSignupUsername(), validatePassword(signupTab), validatePasswordConfirm(), validateFullName(), validateEmail(), validateBirthday(), !(validated.username && validated.password && validated.passwordConfirm && validated.fullName && validated.email && validated.birthday)) return signupButton.classList.remove("disabled"), void navbarLoading.classList.add("hidden");
    var t = {
            username: cachedValidate.username,
            password: signupPassword.value,
            password_confirmation: passwordConfirm.value,
            full_name: cachedValidate.fullName,
            email: cachedValidate.email,
            birthday: cachedValidate.birthday,
            gender: parseInt(document.querySelector('input[name="gender"]:checked').value)
        },
        n = sendAjax("POST", _GLOBAL._API + "/users", t);
    n.onload = function () {
        if (signupButton.classList.remove("disabled"), 201 == n.status) return document.querySelector(".navbar-tab-login").click(), clearSignupForm(), loginUsername.value = t.username, loginPassword.value = t.password, void setTimeout(function () {
            loginButton.click()
        }, 1e3);
        e.innerHTML = "<li>Đăng ký thất bại, vui lòng thử lại</li>", e.parentNode.classList.remove("hidden"), navbarLoading.classList.add("hidden")
    }, n.onerror = function (t) {
        e.innerHTML = "<li>Lỗi kết nối, vui lòng thử lại</li>", e.parentNode.classList.remove("hidden"), signupButton.classList.remove("disabled"), navbarLoading.classList.add("hidden")
    }
}

function login() {
    var e = document.querySelector("#form-login-warning");
    if (e.parentNode.classList.add("hidden"), e.innerHTML = "", navbarLoading.classList.remove("hidden"), loginButton.classList.add("disabled"), !validateLoginUsername() || !validatePassword(loginTab)) return e.innerHTML = "<li>Thông tin đăng nhập không chính xác</li>", e.parentNode.classList.remove("hidden"), loginButton.classList.remove("disabled"), void navbarLoading.classList.add("hidden");
    var t = document.querySelector('input[name="username"]').value,
        n = document.querySelector('input[name="password"]').value,
        i = document.querySelector('input[name="remember"]').checked,
        a = {
            username: t,
            password: n,
            remember: i
        },
        o = sendAjax("POST", _GLOBAL._API + "/users/login", a);
    o.onload = function () {
        if (200 == o.status) return void window.location.reload();
        400 == o.status ? e.innerHTML = "<li>Thông tin đăng nhập không chính xác</li>" : 403 == o.status && (e.innerHTML = "<li>Hệ thống đang tắt chức năng đăng nhập</li>"), e.parentNode.classList.remove("hidden"), loginButton.classList.remove("disabled"), navbarLoading.classList.add("hidden")
    }, o.onerror = function (t) {
        e.innerHTML = "<li>Lỗi kết nối, vui lòng thử lại</li>", e.parentNode.classList.remove("hidden"), loginButton.classList.remove("disabled"), navbarLoading.classList.add("hidden")
    }
}

function logout() {
    var e = sendAjax("POST", _GLOBAL._API + "/users/logout");
    navbarLoading.classList.remove("hidden"), e.onload = function () {
        if (200 == e.status) {
            try {
                store.forEach(function (e, t) {
                    "episode" == e.substring(0, 7) && store.remove(e)
                }), store.remove("notifications")
            } catch (e) {}
            window.location.reload()
        }
    }, e.onerror = function (e) {
        navbarLoading.classList.add("hidden")
    }
}

function getFilms(e, t) {
    if (!lockAPI.all) {
        t || (t = {}), lockAPI.all = !0, allLoading.classList.remove("hidden"), allMore.classList.add("disabled");
        var n = getAllElements(".tray.all .tray-item").length,
            i = sendAjax("GET", _GLOBAL._API + "/films?offset=" + n + "&limit=12");
        i.onload = function () {
            var e = JSON.parse(i.responseText);
            if (200 == i.status) {
                console.log(e);
                for (var t = 0; t < e.data.length; t++) trayAllContent.appendChild(setFilmItem(e.data[t]));
                n + 12 >= e.total && allMore.classList.add("hidden")
            }
            allLoading.classList.add("hidden"), allMore.classList.remove("disabled"), lockAPI.all = !1
        }, i.onerror = function () {
            allLoading.classList.add("hidden"), allMore.classList.remove("disabled"), lockAPI.all = !1
        }
    }
}! function e(t, n, i) {
    function a(r, l) {
        if (!n[r]) {
            if (!t[r]) {
                var s = "function" == typeof require && require;
                if (!l && s) return s(r, !0);
                if (o) return o(r, !0);
                var c = new Error("Cannot find module '" + r + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var d = n[r] = {
                exports: {}
            };
            t[r][0].call(d.exports, function (e) {
                var n = t[r][1][e];
                return a(n || e)
            }, d, d.exports, e, t, n, i)
        }
        return n[r].exports
    }
    for (var o = "function" == typeof require && require, r = 0; r < i.length; r++) a(i[r]);
    return a
}({
    1: [function (e, t, n) {
        "use strict";
        var i = e("../main");
        "function" == typeof define && define.amd ? define(i) : (window.PerfectScrollbar = i, void 0 === window.Ps && (window.Ps = i))
    }, {
        "../main": 7
    }],
    2: [function (e, t, n) {
        "use strict";

        function i(e, t) {
            var n = e.className.split(" ");
            n.indexOf(t) < 0 && n.push(t), e.className = n.join(" ")
        }

        function a(e, t) {
            var n = e.className.split(" "),
                i = n.indexOf(t);
            i >= 0 && n.splice(i, 1), e.className = n.join(" ")
        }
        n.add = function (e, t) {
            e.classList ? e.classList.add(t) : i(e, t)
        }, n.remove = function (e, t) {
            e.classList ? e.classList.remove(t) : a(e, t)
        }, n.list = function (e) {
            return e.classList ? Array.prototype.slice.apply(e.classList) : e.className.split(" ")
        }
    }, {}],
    3: [function (e, t, n) {
        "use strict";

        function i(e, t) {
            return window.getComputedStyle(e)[t]
        }

        function a(e, t, n) {
            return "number" == typeof n && (n = n.toString() + "px"), e.style[t] = n, e
        }

        function o(e, t) {
            for (var n in t) {
                var i = t[n];
                "number" == typeof i && (i = i.toString() + "px"), e.style[n] = i
            }
            return e
        }
        var r = {};
        r.e = function (e, t) {
            var n = document.createElement(e);
            return n.className = t, n
        }, r.appendTo = function (e, t) {
            return t.appendChild(e), e
        }, r.css = function (e, t, n) {
            return "object" == typeof t ? o(e, t) : void 0 === n ? i(e, t) : a(e, t, n)
        }, r.matches = function (e, t) {
            return void 0 !== e.matches ? e.matches(t) : void 0 !== e.matchesSelector ? e.matchesSelector(t) : void 0 !== e.webkitMatchesSelector ? e.webkitMatchesSelector(t) : void 0 !== e.mozMatchesSelector ? e.mozMatchesSelector(t) : void 0 !== e.msMatchesSelector ? e.msMatchesSelector(t) : void 0
        }, r.remove = function (e) {
            void 0 !== e.remove ? e.remove() : e.parentNode && e.parentNode.removeChild(e)
        }, r.queryChildren = function (e, t) {
            return Array.prototype.filter.call(e.childNodes, function (e) {
                return r.matches(e, t)
            })
        }, t.exports = r
    }, {}],
    4: [function (e, t, n) {
        "use strict";
        var i = function (e) {
            this.element = e, this.events = {}
        };
        i.prototype.bind = function (e, t) {
            void 0 === this.events[e] && (this.events[e] = []), this.events[e].push(t), this.element.addEventListener(e, t, !1)
        }, i.prototype.unbind = function (e, t) {
            var n = void 0 !== t;
            this.events[e] = this.events[e].filter(function (i) {
                return !(!n || i === t) || (this.element.removeEventListener(e, i, !1), !1)
            }, this)
        }, i.prototype.unbindAll = function () {
            for (var e in this.events) this.unbind(e)
        };
        var a = function () {
            this.eventElements = []
        };
        a.prototype.eventElement = function (e) {
            var t = this.eventElements.filter(function (t) {
                return t.element === e
            })[0];
            return void 0 === t && (t = new i(e), this.eventElements.push(t)), t
        }, a.prototype.bind = function (e, t, n) {
            this.eventElement(e).bind(t, n)
        }, a.prototype.unbind = function (e, t, n) {
            this.eventElement(e).unbind(t, n)
        }, a.prototype.unbindAll = function () {
            for (var e = 0; e < this.eventElements.length; e++) this.eventElements[e].unbindAll()
        }, a.prototype.once = function (e, t, n) {
            var i = this.eventElement(e),
                a = function (e) {
                    i.unbind(t, a), n(e)
                };
            i.bind(t, a)
        }, t.exports = a
    }, {}],
    5: [function (e, t, n) {
        "use strict";
        t.exports = function () {
            function e() {
                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
            }
            return function () {
                return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
            }
        }()
    }, {}],
    6: [function (e, t, n) {
        "use strict";
        var i = e("./class"),
            a = e("./dom"),
            o = n.toInt = function (e) {
                return parseInt(e, 10) || 0
            },
            r = n.clone = function (e) {
                if (e) {
                    if (e.constructor === Array) return e.map(r);
                    if ("object" == typeof e) {
                        var t = {};
                        for (var n in e) t[n] = r(e[n]);
                        return t
                    }
                    return e
                }
                return null
            };
        n.extend = function (e, t) {
            var n = r(e);
            for (var i in t) n[i] = r(t[i]);
            return n
        }, n.isEditable = function (e) {
            return a.matches(e, "input,[contenteditable]") || a.matches(e, "select,[contenteditable]") || a.matches(e, "textarea,[contenteditable]") || a.matches(e, "button,[contenteditable]")
        }, n.removePsClasses = function (e) {
            for (var t = i.list(e), n = 0; n < t.length; n++) {
                var a = t[n];
                0 === a.indexOf("ps-") && i.remove(e, a)
            }
        }, n.outerWidth = function (e) {
            return o(a.css(e, "width")) + o(a.css(e, "paddingLeft")) + o(a.css(e, "paddingRight")) + o(a.css(e, "borderLeftWidth")) + o(a.css(e, "borderRightWidth"))
        }, n.startScrolling = function (e, t) {
            i.add(e, "ps-in-scrolling"), void 0 !== t ? i.add(e, "ps-" + t) : (i.add(e, "ps-x"), i.add(e, "ps-y"))
        }, n.stopScrolling = function (e, t) {
            i.remove(e, "ps-in-scrolling"), void 0 !== t ? i.remove(e, "ps-" + t) : (i.remove(e, "ps-x"), i.remove(e, "ps-y"))
        }, n.env = {
            isWebKit: "WebkitAppearance" in document.documentElement.style,
            supportsTouch: "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
            supportsIePointer: null !== window.navigator.msMaxTouchPoints
        }
    }, {
        "./class": 2,
        "./dom": 3
    }],
    7: [function (e, t, n) {
        "use strict";
        var i = e("./plugin/destroy"),
            a = e("./plugin/initialize"),
            o = e("./plugin/update");
        t.exports = {
            initialize: a,
            update: o,
            destroy: i
        }
    }, {
        "./plugin/destroy": 9,
        "./plugin/initialize": 17,
        "./plugin/update": 21
    }],
    8: [function (e, t, n) {
        "use strict";
        t.exports = {
            handlers: ["click-rail", "drag-scrollbar", "keyboard", "wheel", "touch"],
            maxScrollbarLength: null,
            minScrollbarLength: null,
            scrollXMarginOffset: 0,
            scrollYMarginOffset: 0,
            suppressScrollX: !1,
            suppressScrollY: !1,
            swipePropagation: !0,
            useBothWheelAxes: !1,
            wheelPropagation: !1,
            wheelSpeed: 1,
            theme: "default"
        }
    }, {}],
    9: [function (e, t, n) {
        "use strict";
        var i = e("../lib/helper"),
            a = e("../lib/dom"),
            o = e("./instances");
        t.exports = function (e) {
            var t = o.get(e);
            t && (t.event.unbindAll(), a.remove(t.scrollbarX), a.remove(t.scrollbarY), a.remove(t.scrollbarXRail), a.remove(t.scrollbarYRail), i.removePsClasses(e), o.remove(e))
        }
    }, {
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18
    }],
    10: [function (e, t, n) {
        "use strict";

        function i(e, t) {
            function n(e) {
                return e.getBoundingClientRect()
            }
            var i = function (e) {
                e.stopPropagation()
            };
            t.event.bind(t.scrollbarY, "click", i), t.event.bind(t.scrollbarYRail, "click", function (i) {
                var a = i.pageY - window.pageYOffset - n(t.scrollbarYRail).top,
                    l = a > t.scrollbarYTop ? 1 : -1;
                r(e, "top", e.scrollTop + l * t.containerHeight), o(e), i.stopPropagation()
            }), t.event.bind(t.scrollbarX, "click", i), t.event.bind(t.scrollbarXRail, "click", function (i) {
                var a = i.pageX - window.pageXOffset - n(t.scrollbarXRail).left,
                    l = a > t.scrollbarXLeft ? 1 : -1;
                r(e, "left", e.scrollLeft + l * t.containerWidth), o(e), i.stopPropagation()
            })
        }
        var a = e("../instances"),
            o = e("../update-geometry"),
            r = e("../update-scroll");
        t.exports = function (e) {
            i(e, a.get(e))
        }
    }, {
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    11: [function (e, t, n) {
        "use strict";

        function i(e, t) {
            function n(n) {
                var a = i + n * t.railXRatio,
                    r = Math.max(0, t.scrollbarXRail.getBoundingClientRect().left) + t.railXRatio * (t.railXWidth - t.scrollbarXWidth);
                t.scrollbarXLeft = a < 0 ? 0 : a > r ? r : a;
                var l = o.toInt(t.scrollbarXLeft * (t.contentWidth - t.containerWidth) / (t.containerWidth - t.railXRatio * t.scrollbarXWidth)) - t.negativeScrollAdjustment;
                c(e, "left", l)
            }
            var i = null,
                a = null,
                l = function (t) {
                    n(t.pageX - a), s(e), t.stopPropagation(), t.preventDefault()
                },
                d = function () {
                    o.stopScrolling(e, "x"), t.event.unbind(t.ownerDocument, "mousemove", l)
                };
            t.event.bind(t.scrollbarX, "mousedown", function (n) {
                a = n.pageX, i = o.toInt(r.css(t.scrollbarX, "left")) * t.railXRatio, o.startScrolling(e, "x"), t.event.bind(t.ownerDocument, "mousemove", l), t.event.once(t.ownerDocument, "mouseup", d), n.stopPropagation(), n.preventDefault()
            })
        }

        function a(e, t) {
            function n(n) {
                var a = i + n * t.railYRatio,
                    r = Math.max(0, t.scrollbarYRail.getBoundingClientRect().top) + t.railYRatio * (t.railYHeight - t.scrollbarYHeight);
                t.scrollbarYTop = a < 0 ? 0 : a > r ? r : a;
                var l = o.toInt(t.scrollbarYTop * (t.contentHeight - t.containerHeight) / (t.containerHeight - t.railYRatio * t.scrollbarYHeight));
                c(e, "top", l)
            }
            var i = null,
                a = null,
                l = function (t) {
                    n(t.pageY - a), s(e), t.stopPropagation(), t.preventDefault()
                },
                d = function () {
                    o.stopScrolling(e, "y"), t.event.unbind(t.ownerDocument, "mousemove", l)
                };
            t.event.bind(t.scrollbarY, "mousedown", function (n) {
                a = n.pageY, i = o.toInt(r.css(t.scrollbarY, "top")) * t.railYRatio, o.startScrolling(e, "y"), t.event.bind(t.ownerDocument, "mousemove", l), t.event.once(t.ownerDocument, "mouseup", d), n.stopPropagation(), n.preventDefault()
            })
        }
        var o = e("../../lib/helper"),
            r = e("../../lib/dom"),
            l = e("../instances"),
            s = e("../update-geometry"),
            c = e("../update-scroll");
        t.exports = function (e) {
            var t = l.get(e);
            i(e, t), a(e, t)
        }
    }, {
        "../../lib/dom": 3,
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    12: [function (e, t, n) {
        "use strict";

        function i(e, t) {
            function n(n, i) {
                var a = e.scrollTop;
                if (0 === n) {
                    if (!t.scrollbarYActive) return !1;
                    if (0 === a && i > 0 || a >= t.contentHeight - t.containerHeight && i < 0) return !t.settings.wheelPropagation
                }
                var o = e.scrollLeft;
                if (0 === i) {
                    if (!t.scrollbarXActive) return !1;
                    if (0 === o && n < 0 || o >= t.contentWidth - t.containerWidth && n > 0) return !t.settings.wheelPropagation
                }
                return !0
            }
            var i = !1;
            t.event.bind(e, "mouseenter", function () {
                i = !0
            }), t.event.bind(e, "mouseleave", function () {
                i = !1
            });
            var r = !1;
            t.event.bind(t.ownerDocument, "keydown", function (c) {
                if (!(c.isDefaultPrevented && c.isDefaultPrevented() || c.defaultPrevented)) {
                    var d = o.matches(t.scrollbarX, ":focus") || o.matches(t.scrollbarY, ":focus");
                    if (i || d) {
                        var u = document.activeElement ? document.activeElement : t.ownerDocument.activeElement;
                        if (u) {
                            if ("IFRAME" === u.tagName) u = u.contentDocument.activeElement;
                            else
                                for (; u.shadowRoot;) u = u.shadowRoot.activeElement;
                            if (a.isEditable(u)) return
                        }
                        var h = 0,
                            f = 0;
                        switch (c.which) {
                            case 37:
                                h = c.metaKey ? -t.contentWidth : c.altKey ? -t.containerWidth : -30;
                                break;
                            case 38:
                                f = c.metaKey ? t.contentHeight : c.altKey ? t.containerHeight : 30;
                                break;
                            case 39:
                                h = c.metaKey ? t.contentWidth : c.altKey ? t.containerWidth : 30;
                                break;
                            case 40:
                                f = c.metaKey ? -t.contentHeight : c.altKey ? -t.containerHeight : -30;
                                break;
                            case 33:
                                f = 90;
                                break;
                            case 32:
                                f = c.shiftKey ? 90 : -90;
                                break;
                            case 34:
                                f = -90;
                                break;
                            case 35:
                                f = c.ctrlKey ? -t.contentHeight : -t.containerHeight;
                                break;
                            case 36:
                                f = c.ctrlKey ? e.scrollTop : t.containerHeight;
                                break;
                            default:
                                return
                        }
                        s(e, "top", e.scrollTop - f), s(e, "left", e.scrollLeft + h), l(e), (r = n(h, f)) && c.preventDefault()
                    }
                }
            })
        }
        var a = e("../../lib/helper"),
            o = e("../../lib/dom"),
            r = e("../instances"),
            l = e("../update-geometry"),
            s = e("../update-scroll");
        t.exports = function (e) {
            i(e, r.get(e))
        }
    }, {
        "../../lib/dom": 3,
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    13: [function (e, t, n) {
        "use strict";

        function i(e, t) {
            function n(n, i) {
                var a = e.scrollTop;
                if (0 === n) {
                    if (!t.scrollbarYActive) return !1;
                    if (0 === a && i > 0 || a >= t.contentHeight - t.containerHeight && i < 0) return !t.settings.wheelPropagation
                }
                var o = e.scrollLeft;
                if (0 === i) {
                    if (!t.scrollbarXActive) return !1;
                    if (0 === o && n < 0 || o >= t.contentWidth - t.containerWidth && n > 0) return !t.settings.wheelPropagation
                }
                return !0
            }

            function i(e) {
                var t = e.deltaX,
                    n = -1 * e.deltaY;
                return void 0 !== t && void 0 !== n || (t = -1 * e.wheelDeltaX / 6, n = e.wheelDeltaY / 6), e.deltaMode && 1 === e.deltaMode && (t *= 10, n *= 10), t !== t && n !== n && (t = 0, n = e.wheelDelta), e.shiftKey ? [-n, -t] : [t, n]
            }

            function a(t, n) {
                var i = e.querySelector("textarea:hover, select[multiple]:hover, .ps-child:hover");
                if (i) {
                    if (!window.getComputedStyle(i).overflow.match(/(scroll|auto)/)) return !1;
                    var a = i.scrollHeight - i.clientHeight;
                    if (a > 0 && !(0 === i.scrollTop && n > 0 || i.scrollTop === a && n < 0)) return !0;
                    var o = i.scrollLeft - i.clientWidth;
                    if (o > 0 && !(0 === i.scrollLeft && t < 0 || i.scrollLeft === o && t > 0)) return !0
                }
                return !1
            }

            function l(l) {
                var c = i(l),
                    d = c[0],
                    u = c[1];
                a(d, u) || (s = !1, t.settings.useBothWheelAxes ? t.scrollbarYActive && !t.scrollbarXActive ? (u ? r(e, "top", e.scrollTop - u * t.settings.wheelSpeed) : r(e, "top", e.scrollTop + d * t.settings.wheelSpeed), s = !0) : t.scrollbarXActive && !t.scrollbarYActive && (d ? r(e, "left", e.scrollLeft + d * t.settings.wheelSpeed) : r(e, "left", e.scrollLeft - u * t.settings.wheelSpeed), s = !0) : (r(e, "top", e.scrollTop - u * t.settings.wheelSpeed), r(e, "left", e.scrollLeft + d * t.settings.wheelSpeed)), o(e), (s = s || n(d, u)) && (l.stopPropagation(), l.preventDefault()))
            }
            var s = !1;
            void 0 !== window.onwheel ? t.event.bind(e, "wheel", l) : void 0 !== window.onmousewheel && t.event.bind(e, "mousewheel", l)
        }
        var a = e("../instances"),
            o = e("../update-geometry"),
            r = e("../update-scroll");
        t.exports = function (e) {
            i(e, a.get(e))
        }
    }, {
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    14: [function (e, t, n) {
        "use strict";

        function i(e, t) {
            t.event.bind(e, "scroll", function () {
                o(e)
            })
        }
        var a = e("../instances"),
            o = e("../update-geometry");
        t.exports = function (e) {
            i(e, a.get(e))
        }
    }, {
        "../instances": 18,
        "../update-geometry": 19
    }],
    15: [function (e, t, n) {
        "use strict";

        function i(e, t) {
            function n() {
                var e = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : "";
                return 0 === e.toString().length ? null : e.getRangeAt(0).commonAncestorContainer
            }

            function i() {
                c || (c = setInterval(function () {
                    return o.get(e) ? (l(e, "top", e.scrollTop + d.top), l(e, "left", e.scrollLeft + d.left), void r(e)) : void clearInterval(c)
                }, 50))
            }

            function s() {
                c && (clearInterval(c), c = null), a.stopScrolling(e)
            }
            var c = null,
                d = {
                    top: 0,
                    left: 0
                },
                u = !1;
            t.event.bind(t.ownerDocument, "selectionchange", function () {
                e.contains(n()) ? u = !0 : (u = !1, s())
            }), t.event.bind(window, "mouseup", function () {
                u && (u = !1, s())
            }), t.event.bind(window, "keyup", function () {
                u && (u = !1, s())
            }), t.event.bind(window, "mousemove", function (t) {
                if (u) {
                    var n = {
                            x: t.pageX,
                            y: t.pageY
                        },
                        o = {
                            left: e.offsetLeft,
                            right: e.offsetLeft + e.offsetWidth,
                            top: e.offsetTop,
                            bottom: e.offsetTop + e.offsetHeight
                        };
                    n.x < o.left + 3 ? (d.left = -5, a.startScrolling(e, "x")) : n.x > o.right - 3 ? (d.left = 5, a.startScrolling(e, "x")) : d.left = 0, n.y < o.top + 3 ? (d.top = o.top + 3 - n.y < 5 ? -5 : -20, a.startScrolling(e, "y")) : n.y > o.bottom - 3 ? (d.top = n.y - o.bottom + 3 < 5 ? 5 : 20, a.startScrolling(e, "y")) : d.top = 0, 0 === d.top && 0 === d.left ? s() : i()
                }
            })
        }
        var a = e("../../lib/helper"),
            o = e("../instances"),
            r = e("../update-geometry"),
            l = e("../update-scroll");
        t.exports = function (e) {
            i(e, o.get(e))
        }
    }, {
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    16: [function (e, t, n) {
        "use strict";

        function i(e, t, n, i) {
            function a(n, i) {
                var a = e.scrollTop,
                    o = e.scrollLeft,
                    r = Math.abs(n),
                    l = Math.abs(i);
                if (l > r) {
                    if (i < 0 && a === t.contentHeight - t.containerHeight || i > 0 && 0 === a) return !t.settings.swipePropagation
                } else if (r > l && (n < 0 && o === t.contentWidth - t.containerWidth || n > 0 && 0 === o)) return !t.settings.swipePropagation;
                return !0
            }

            function s(t, n) {
                l(e, "top", e.scrollTop - n), l(e, "left", e.scrollLeft - t), r(e)
            }

            function c() {
                L = !0
            }

            function d() {
                L = !1
            }

            function u(e) {
                return e.targetTouches ? e.targetTouches[0] : e
            }

            function h(e) {
                return !(!e.targetTouches || 1 !== e.targetTouches.length) || !(!e.pointerType || "mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE)
            }

            function f(e) {
                if (h(e)) {
                    w = !0;
                    var t = u(e);
                    g.pageX = t.pageX, g.pageY = t.pageY, p = (new Date).getTime(), null !== y && clearInterval(y), e.stopPropagation()
                }
            }

            function v(e) {
                if (!w && t.settings.swipePropagation && f(e), !L && w && h(e)) {
                    var n = u(e),
                        i = {
                            pageX: n.pageX,
                            pageY: n.pageY
                        },
                        o = i.pageX - g.pageX,
                        r = i.pageY - g.pageY;
                    s(o, r), g = i;
                    var l = (new Date).getTime(),
                        c = l - p;
                    c > 0 && (b.x = o / c, b.y = r / c, p = l), a(o, r) && (e.stopPropagation(), e.preventDefault())
                }
            }

            function m() {
                !L && w && (w = !1, clearInterval(y), y = setInterval(function () {
                    return o.get(e) && (b.x || b.y) ? Math.abs(b.x) < .01 && Math.abs(b.y) < .01 ? void clearInterval(y) : (s(30 * b.x, 30 * b.y), b.x *= .8, void(b.y *= .8)) : void clearInterval(y)
                }, 10))
            }
            var g = {},
                p = 0,
                b = {},
                y = null,
                L = !1,
                w = !1;
            n ? (t.event.bind(window, "touchstart", c), t.event.bind(window, "touchend", d), t.event.bind(e, "touchstart", f), t.event.bind(e, "touchmove", v), t.event.bind(e, "touchend", m)) : i && (window.PointerEvent ? (t.event.bind(window, "pointerdown", c), t.event.bind(window, "pointerup", d), t.event.bind(e, "pointerdown", f), t.event.bind(e, "pointermove", v), t.event.bind(e, "pointerup", m)) : window.MSPointerEvent && (t.event.bind(window, "MSPointerDown", c), t.event.bind(window, "MSPointerUp", d), t.event.bind(e, "MSPointerDown", f), t.event.bind(e, "MSPointerMove", v), t.event.bind(e, "MSPointerUp", m)))
        }
        var a = e("../../lib/helper"),
            o = e("../instances"),
            r = e("../update-geometry"),
            l = e("../update-scroll");
        t.exports = function (e) {
            if (a.env.supportsTouch || a.env.supportsIePointer) {
                i(e, o.get(e), a.env.supportsTouch, a.env.supportsIePointer)
            }
        }
    }, {
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    17: [function (e, t, n) {
        "use strict";
        var i = e("../lib/helper"),
            a = e("../lib/class"),
            o = e("./instances"),
            r = e("./update-geometry"),
            l = {
                "click-rail": e("./handler/click-rail"),
                "drag-scrollbar": e("./handler/drag-scrollbar"),
                keyboard: e("./handler/keyboard"),
                wheel: e("./handler/mouse-wheel"),
                touch: e("./handler/touch"),
                selection: e("./handler/selection")
            },
            s = e("./handler/native-scroll");
        t.exports = function (e, t) {
            t = "object" == typeof t ? t : {}, a.add(e, "ps-container");
            var n = o.add(e);
            n.settings = i.extend(n.settings, t), a.add(e, "ps-theme-" + n.settings.theme), n.settings.handlers.forEach(function (t) {
                l[t](e)
            }), s(e), r(e)
        }
    }, {
        "../lib/class": 2,
        "../lib/helper": 6,
        "./handler/click-rail": 10,
        "./handler/drag-scrollbar": 11,
        "./handler/keyboard": 12,
        "./handler/mouse-wheel": 13,
        "./handler/native-scroll": 14,
        "./handler/selection": 15,
        "./handler/touch": 16,
        "./instances": 18,
        "./update-geometry": 19
    }],
    18: [function (e, t, n) {
        "use strict";

        function i(e) {
            function t() {
                s.add(e, "ps-focus")
            }

            function n() {
                s.remove(e, "ps-focus")
            }
            var i = this;
            i.settings = l.clone(c), i.containerWidth = null, i.containerHeight = null, i.contentWidth = null, i.contentHeight = null, i.isRtl = "rtl" === d.css(e, "direction"), i.isNegativeScroll = function () {
                var t = e.scrollLeft,
                    n = null;
                return e.scrollLeft = -1, n = e.scrollLeft < 0, e.scrollLeft = t, n
            }(), i.negativeScrollAdjustment = i.isNegativeScroll ? e.scrollWidth - e.clientWidth : 0, i.event = new u, i.ownerDocument = e.ownerDocument || document, i.scrollbarXRail = d.appendTo(d.e("div", "ps-scrollbar-x-rail"), e), i.scrollbarX = d.appendTo(d.e("div", "ps-scrollbar-x"), i.scrollbarXRail), i.scrollbarX.setAttribute("tabindex", 0), i.event.bind(i.scrollbarX, "focus", t), i.event.bind(i.scrollbarX, "blur", n), i.scrollbarXActive = null, i.scrollbarXWidth = null, i.scrollbarXLeft = null, i.scrollbarXBottom = l.toInt(d.css(i.scrollbarXRail, "bottom")), i.isScrollbarXUsingBottom = i.scrollbarXBottom === i.scrollbarXBottom, i.scrollbarXTop = i.isScrollbarXUsingBottom ? null : l.toInt(d.css(i.scrollbarXRail, "top")), i.railBorderXWidth = l.toInt(d.css(i.scrollbarXRail, "borderLeftWidth")) + l.toInt(d.css(i.scrollbarXRail, "borderRightWidth")), d.css(i.scrollbarXRail, "display", "block"), i.railXMarginWidth = l.toInt(d.css(i.scrollbarXRail, "marginLeft")) + l.toInt(d.css(i.scrollbarXRail, "marginRight")), d.css(i.scrollbarXRail, "display", ""), i.railXWidth = null, i.railXRatio = null, i.scrollbarYRail = d.appendTo(d.e("div", "ps-scrollbar-y-rail"), e), i.scrollbarY = d.appendTo(d.e("div", "ps-scrollbar-y"), i.scrollbarYRail), i.scrollbarY.setAttribute("tabindex", 0), i.event.bind(i.scrollbarY, "focus", t), i.event.bind(i.scrollbarY, "blur", n), i.scrollbarYActive = null, i.scrollbarYHeight = null, i.scrollbarYTop = null, i.scrollbarYRight = l.toInt(d.css(i.scrollbarYRail, "right")), i.isScrollbarYUsingRight = i.scrollbarYRight === i.scrollbarYRight, i.scrollbarYLeft = i.isScrollbarYUsingRight ? null : l.toInt(d.css(i.scrollbarYRail, "left")), i.scrollbarYOuterWidth = i.isRtl ? l.outerWidth(i.scrollbarY) : null, i.railBorderYWidth = l.toInt(d.css(i.scrollbarYRail, "borderTopWidth")) + l.toInt(d.css(i.scrollbarYRail, "borderBottomWidth")), d.css(i.scrollbarYRail, "display", "block"), i.railYMarginHeight = l.toInt(d.css(i.scrollbarYRail, "marginTop")) + l.toInt(d.css(i.scrollbarYRail, "marginBottom")), d.css(i.scrollbarYRail, "display", ""), i.railYHeight = null, i.railYRatio = null
        }

        function a(e) {
            return e.getAttribute("data-ps-id")
        }

        function o(e, t) {
            e.setAttribute("data-ps-id", t)
        }

        function r(e) {
            e.removeAttribute("data-ps-id")
        }
        var l = e("../lib/helper"),
            s = e("../lib/class"),
            c = e("./default-setting"),
            d = e("../lib/dom"),
            u = e("../lib/event-manager"),
            h = e("../lib/guid"),
            f = {};
        n.add = function (e) {
            var t = h();
            return o(e, t), f[t] = new i(e), f[t]
        }, n.remove = function (e) {
            delete f[a(e)], r(e)
        }, n.get = function (e) {
            return f[a(e)]
        }
    }, {
        "../lib/class": 2,
        "../lib/dom": 3,
        "../lib/event-manager": 4,
        "../lib/guid": 5,
        "../lib/helper": 6,
        "./default-setting": 8
    }],
    19: [function (e, t, n) {
        "use strict";

        function i(e, t) {
            return e.settings.minScrollbarLength && (t = Math.max(t, e.settings.minScrollbarLength)), e.settings.maxScrollbarLength && (t = Math.min(t, e.settings.maxScrollbarLength)), t
        }

        function a(e, t) {
            var n = {
                width: t.railXWidth
            };
            t.isRtl ? n.left = t.negativeScrollAdjustment + e.scrollLeft + t.containerWidth - t.contentWidth : n.left = e.scrollLeft, t.isScrollbarXUsingBottom ? n.bottom = t.scrollbarXBottom - e.scrollTop : n.top = t.scrollbarXTop + e.scrollTop, l.css(t.scrollbarXRail, n);
            var i = {
                top: e.scrollTop,
                height: t.railYHeight
            };
            t.isScrollbarYUsingRight ? t.isRtl ? i.right = t.contentWidth - (t.negativeScrollAdjustment + e.scrollLeft) - t.scrollbarYRight - t.scrollbarYOuterWidth : i.right = t.scrollbarYRight - e.scrollLeft : t.isRtl ? i.left = t.negativeScrollAdjustment + e.scrollLeft + 2 * t.containerWidth - t.contentWidth - t.scrollbarYLeft - t.scrollbarYOuterWidth : i.left = t.scrollbarYLeft + e.scrollLeft, l.css(t.scrollbarYRail, i), l.css(t.scrollbarX, {
                left: t.scrollbarXLeft,
                width: t.scrollbarXWidth - t.railBorderXWidth
            }), l.css(t.scrollbarY, {
                top: t.scrollbarYTop,
                height: t.scrollbarYHeight - t.railBorderYWidth
            })
        }
        var o = e("../lib/helper"),
            r = e("../lib/class"),
            l = e("../lib/dom"),
            s = e("./instances"),
            c = e("./update-scroll");
        t.exports = function (e) {
            var t = s.get(e);
            t.containerWidth = e.clientWidth, t.containerHeight = e.clientHeight, t.contentWidth = e.scrollWidth, t.contentHeight = e.scrollHeight;
            var n;
            e.contains(t.scrollbarXRail) || (n = l.queryChildren(e, ".ps-scrollbar-x-rail"), n.length > 0 && n.forEach(function (e) {
                l.remove(e)
            }), l.appendTo(t.scrollbarXRail, e)), e.contains(t.scrollbarYRail) || (n = l.queryChildren(e, ".ps-scrollbar-y-rail"), n.length > 0 && n.forEach(function (e) {
                l.remove(e)
            }), l.appendTo(t.scrollbarYRail, e)), !t.settings.suppressScrollX && t.containerWidth + t.settings.scrollXMarginOffset < t.contentWidth ? (t.scrollbarXActive = !0, t.railXWidth = t.containerWidth - t.railXMarginWidth, t.railXRatio = t.containerWidth / t.railXWidth, t.scrollbarXWidth = i(t, o.toInt(t.railXWidth * t.containerWidth / t.contentWidth)), t.scrollbarXLeft = o.toInt((t.negativeScrollAdjustment + e.scrollLeft) * (t.railXWidth - t.scrollbarXWidth) / (t.contentWidth - t.containerWidth))) : t.scrollbarXActive = !1, !t.settings.suppressScrollY && t.containerHeight + t.settings.scrollYMarginOffset < t.contentHeight ? (t.scrollbarYActive = !0, t.railYHeight = t.containerHeight - t.railYMarginHeight, t.railYRatio = t.containerHeight / t.railYHeight, t.scrollbarYHeight = i(t, o.toInt(t.railYHeight * t.containerHeight / t.contentHeight)), t.scrollbarYTop = o.toInt(e.scrollTop * (t.railYHeight - t.scrollbarYHeight) / (t.contentHeight - t.containerHeight))) : t.scrollbarYActive = !1, t.scrollbarXLeft >= t.railXWidth - t.scrollbarXWidth && (t.scrollbarXLeft = t.railXWidth - t.scrollbarXWidth), t.scrollbarYTop >= t.railYHeight - t.scrollbarYHeight && (t.scrollbarYTop = t.railYHeight - t.scrollbarYHeight), a(e, t), t.scrollbarXActive ? r.add(e, "ps-active-x") : (r.remove(e, "ps-active-x"), t.scrollbarXWidth = 0, t.scrollbarXLeft = 0, c(e, "left", 0)), t.scrollbarYActive ? r.add(e, "ps-active-y") : (r.remove(e, "ps-active-y"), t.scrollbarYHeight = 0, t.scrollbarYTop = 0, c(e, "top", 0))
        }
    }, {
        "../lib/class": 2,
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18,
        "./update-scroll": 20
    }],
    20: [function (e, t, n) {
        "use strict";
        var i, a, o = e("./instances"),
            r = function (e) {
                var t = document.createEvent("Event");
                return t.initEvent(e, !0, !0), t
            };
        t.exports = function (e, t, n) {
            if (void 0 === e) throw "You must provide an element to the update-scroll function";
            if (void 0 === t) throw "You must provide an axis to the update-scroll function";
            if (void 0 === n) throw "You must provide a value to the update-scroll function";
            "top" === t && n <= 0 && (e.scrollTop = n = 0, e.dispatchEvent(r("ps-y-reach-start"))), "left" === t && n <= 0 && (e.scrollLeft = n = 0, e.dispatchEvent(r("ps-x-reach-start")));
            var l = o.get(e);
            "top" === t && n >= l.contentHeight - l.containerHeight && (n = l.contentHeight - l.containerHeight, n - e.scrollTop <= 1 ? n = e.scrollTop : e.scrollTop = n, e.dispatchEvent(r("ps-y-reach-end"))), "left" === t && n >= l.contentWidth - l.containerWidth && (n = l.contentWidth - l.containerWidth, n - e.scrollLeft <= 1 ? n = e.scrollLeft : e.scrollLeft = n, e.dispatchEvent(r("ps-x-reach-end"))), i || (i = e.scrollTop), a || (a = e.scrollLeft), "top" === t && n < i && e.dispatchEvent(r("ps-scroll-up")), "top" === t && n > i && e.dispatchEvent(r("ps-scroll-down")), "left" === t && n < a && e.dispatchEvent(r("ps-scroll-left")), "left" === t && n > a && e.dispatchEvent(r("ps-scroll-right")), "top" === t && (e.scrollTop = i = n, e.dispatchEvent(r("ps-scroll-y"))), "left" === t && (e.scrollLeft = a = n, e.dispatchEvent(r("ps-scroll-x")))
        }
    }, {
        "./instances": 18
    }],
    21: [function (e, t, n) {
        "use strict";
        var i = e("../lib/helper"),
            a = e("../lib/dom"),
            o = e("./instances"),
            r = e("./update-geometry"),
            l = e("./update-scroll");
        t.exports = function (e) {
            var t = o.get(e);
            t && (t.negativeScrollAdjustment = t.isNegativeScroll ? e.scrollWidth - e.clientWidth : 0, a.css(t.scrollbarXRail, "display", "block"), a.css(t.scrollbarYRail, "display", "block"), t.railXMarginWidth = i.toInt(a.css(t.scrollbarXRail, "marginLeft")) + i.toInt(a.css(t.scrollbarXRail, "marginRight")), t.railYMarginHeight = i.toInt(a.css(t.scrollbarYRail, "marginTop")) + i.toInt(a.css(t.scrollbarYRail, "marginBottom")), a.css(t.scrollbarXRail, "display", "none"), a.css(t.scrollbarYRail, "display", "none"), r(e), l(e, "top", e.scrollTop), l(e, "left", e.scrollLeft), a.css(t.scrollbarXRail, "display", ""), a.css(t.scrollbarYRail, "display", ""))
        }
    }, {
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18,
        "./update-geometry": 19,
        "./update-scroll": 20
    }]
}, {}, [1]),
function (e, t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : e.store = t()
}(this, function () {
    var e, t = {},
        n = window,
        i = n.document,
        a = "localStorage",
        o = "script";
    if (t.disabled = !1, t.version = "1.3.19", t.set = function (e, t) {}, t.get = function (e, t) {}, t.has = function (e) {
            return void 0 !== t.get(e)
        }, t.remove = function (e) {}, t.clear = function () {}, t.transact = function (e, n, i) {
            null == i && (i = n, n = null), null == n && (n = {});
            var a = t.get(e, n);
            i(a), t.set(e, a)
        }, t.getAll = function () {}, t.forEach = function () {}, t.serialize = function (e) {
            return JSON.stringify(e)
        }, t.deserialize = function (e) {
            if ("string" == typeof e) try {
                return JSON.parse(e)
            } catch (t) {
                return e || void 0
            }
        }, function () {
            try {
                return a in n && n[a]
            } catch (e) {
                return !1
            }
        }()) e = n[a], t.set = function (n, i) {
        return void 0 === i ? t.remove(n) : (e.setItem(n, t.serialize(i)), i)
    }, t.get = function (n, i) {
        var a = t.deserialize(e.getItem(n));
        return void 0 === a ? i : a
    }, t.remove = function (t) {
        e.removeItem(t)
    }, t.clear = function () {
        e.clear()
    }, t.getAll = function () {
        var e = {};
        return t.forEach(function (t, n) {
            e[t] = n
        }), e
    }, t.forEach = function (n) {
        for (var i = 0; i < e.length; i++) {
            var a = e.key(i);
            n(a, t.get(a))
        }
    };
    else if (i.documentElement.addBehavior) {
        var r, l;
        try {
            l = new ActiveXObject("htmlfile"), l.open(), l.write("<" + o + ">document.w=window</" + o + '><iframe src="/favicon.ico"></iframe>'), l.close(), r = l.w.frames[0].document, e = r.createElement("div")
        } catch (t) {
            e = i.createElement("div"), r = i.body
        }
        var s = function (n) {
                return function () {
                    var i = Array.prototype.slice.call(arguments, 0);
                    i.unshift(e), r.appendChild(e), e.addBehavior("#default#userData"), e.load(a);
                    var o = n.apply(t, i);
                    return r.removeChild(e), o
                }
            },
            c = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g"),
            d = function (e) {
                return e.replace(/^d/, "___$&").replace(c, "___")
            };
        t.set = s(function (e, n, i) {
            return n = d(n), void 0 === i ? t.remove(n) : (e.setAttribute(n, t.serialize(i)), e.save(a), i)
        }), t.get = s(function (e, n, i) {
            n = d(n);
            var a = t.deserialize(e.getAttribute(n));
            return void 0 === a ? i : a
        }), t.remove = s(function (e, t) {
            t = d(t), e.removeAttribute(t), e.save(a)
        }), t.clear = s(function (e) {
            var t = e.XMLDocument.documentElement.attributes;
            for (e.load(a); t.length;) e.removeAttribute(t[0].name);
            e.save(a)
        }), t.getAll = function (e) {
            var n = {};
            return t.forEach(function (e, t) {
                n[e] = t
            }), n
        }, t.forEach = s(function (e, n) {
            for (var i, a = e.XMLDocument.documentElement.attributes, o = 0; i = a[o]; ++o) n(i.name, t.deserialize(e.getAttribute(i.name)))
        })
    }
    try {
        var u = "__storejs__";
        t.set(u, u), t.get(u) != u && (t.disabled = !0), t.remove(u)
    } catch (e) {
        t.disabled = !0
    }
    return t.enabled = !t.disabled, t
}),
function (e) {
    var t = /iPhone/i,
        n = /iPod/i,
        i = /iPad/i,
        a = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
        o = /Android/i,
        r = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
        l = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
        s = /IEMobile/i,
        c = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
        d = /BlackBerry/i,
        u = /BB10/i,
        h = /Opera Mini/i,
        f = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
        v = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
        m = /UC.*Browser|UCWEB/i,
        g = /AppleTV/i,
        p = /(GoogleTV|CrKey)/i,
        b = /(SmartTV|SMART-TV|Tizen(.*TV))/i,
        y = /(Sony(.*TV)|TV(.*Sony))/i,
        L = /(LG(.*NetCast))/i,
        w = /TSB(.*TV)/i,
        T = /Viera/i,
        x = /(HbbTV|Espial|NETTV|TV(.*HDMI))/i,
        S = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"),
        k = function (e, t) {
            return e.test(t)
        },
        E = function (e) {
            var E = e || navigator.userAgent,
                A = E.split("[FBAN");
            if (void 0 !== A[1] && (E = A[0]), this.apple = {
                    phone: k(t, E),
                    ipod: k(n, E),
                    tablet: !k(t, E) && k(i, E),
                    device: k(t, E) || k(n, E) || k(i, E)
                }, this.amazon = {
                    phone: k(r, E),
                    tablet: !k(r, E) && k(l, E),
                    device: k(r, E) || k(l, E)
                }, this.android = {
                    phone: k(r, E) || k(a, E),
                    tablet: !k(r, E) && !k(a, E) && (k(l, E) || k(o, E)),
                    device: k(r, E) || k(l, E) || k(a, E) || k(o, E)
                }, this.windows = {
                    phone: k(s, E),
                    tablet: k(c, E),
                    device: k(s, E) || k(c, E)
                }, this.tvu = {
                    apple: k(g, E),
                    google: k(p, E),
                    samsung: k(b, E),
                    sony: k(y, E),
                    lg: k(L, E),
                    toshiba: k(w, E),
                    panasonic: k(T, E),
                    other: k(x, E)
                }, this.other = {
                    blackberry: k(d, E),
                    blackberry10: k(u, E),
                    opera: k(h, E),
                    firefox: k(v, E),
                    chrome: k(f, E),
                    uc: k(m, E),
                    device: k(d, E) || k(u, E) || k(h, E) || k(v, E) || k(f, E)
                }, this.seven_inch = k(S, E), this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch, this.phone = this.apple.phone || this.android.phone || this.windows.phone, this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet, this.tv = this.tvu.apple || this.tvu.google || this.tvu.samsung || this.tvu.sony || this.tvu.lg || this.tvu.toshiba || this.tvu.panasonic || this.tvu.other, "undefined" == typeof window) return this
        },
        A = function () {
            var e = new E;
            return e.Class = E, e
        };
    "undefined" != typeof module && module.exports && "undefined" == typeof window ? module.exports = E : "undefined" != typeof module && module.exports && "undefined" != typeof window ? module.exports = A() : "function" == typeof define && define.amd ? define("ismobile", [], e.ismobile = A()) : e.ismobile = A()
}(this),
function () {
    "use strict";

    function e() {
        var e = {
            parent: document.body,
            version: "1.0.11",
            defaultOkLabel: "Ok",
            okLabel: "Ok",
            defaultCancelLabel: "Cancel",
            cancelLabel: "Cancel",
            defaultMaxLogItems: 2,
            maxLogItems: 2,
            promptValue: "",
            promptPlaceholder: "",
            closeLogOnClick: !1,
            closeLogOnClickDefault: !1,
            delay: 5e3,
            defaultDelay: 5e3,
            logContainerClass: "alertify-logs",
            logContainerDefaultClass: "alertify-logs",
            dialogs: {
                buttons: {
                    holder: "<nav>{{buttons}}</nav>",
                    ok: "<button class='ok' tabindex='1'>{{ok}}</button>",
                    cancel: "<button class='cancel' tabindex='2'>{{cancel}}</button>"
                },
                input: "<input type='text'>",
                message: "<p class='msg'>{{message}}</p>",
                log: "<div class='{{class}}'>{{message}}</div>"
            },
            defaultDialogs: {
                buttons: {
                    holder: "<nav>{{buttons}}</nav>",
                    ok: "<button class='ok' tabindex='1'>{{ok}}</button>",
                    cancel: "<button class='cancel' tabindex='2'>{{cancel}}</button>"
                },
                input: "<input type='text'>",
                message: "<p class='msg'>{{message}}</p>",
                log: "<div class='{{class}}'>{{message}}</div>"
            },
            build: function (e) {
                var t = this.dialogs.buttons.ok,
                    n = "<div class='dialog'><div>" + this.dialogs.message.replace("{{message}}", e.message);
                return "confirm" !== e.type && "prompt" !== e.type || (t = this.dialogs.buttons.cancel + this.dialogs.buttons.ok), "prompt" === e.type && (n += this.dialogs.input), n = (n + this.dialogs.buttons.holder + "</div></div>").replace("{{buttons}}", t).replace("{{ok}}", this.okLabel).replace("{{cancel}}", this.cancelLabel)
            },
            setCloseLogOnClick: function (e) {
                this.closeLogOnClick = !!e
            },
            close: function (e, n) {
                this.closeLogOnClick && e.addEventListener("click", function () {
                    t(e)
                }), n = n && !isNaN(+n) ? +n : this.delay, 0 > n ? t(e) : n > 0 && setTimeout(function () {
                    t(e)
                }, n)
            },
            dialog: function (e, t, n, i) {
                return this.setup({
                    type: t,
                    message: e,
                    onOkay: n,
                    onCancel: i
                })
            },
            log: function (e, t, n) {
                var i = document.querySelectorAll(".alertify-logs > div");
                if (i) {
                    var a = i.length - this.maxLogItems;
                    if (a >= 0)
                        for (var o = 0, r = a + 1; r > o; o++) this.close(i[o], -1)
                }
                this.notify(e, t, n)
            },
            setLogPosition: function (e) {
                this.logContainerClass = "alertify-logs " + e
            },
            setupLogContainer: function () {
                var e = document.querySelector(".alertify-logs"),
                    t = this.logContainerClass;
                return e || (e = document.createElement("div"), e.className = t, this.parent.appendChild(e)), e.className !== t && (e.className = t), e
            },
            notify: function (t, n, i) {
                var a = this.setupLogContainer(),
                    o = document.createElement("div");
                o.className = n || "default", e.logTemplateMethod ? o.innerHTML = e.logTemplateMethod(t) : o.innerHTML = t, "function" == typeof i && o.addEventListener("click", i), a.appendChild(o), setTimeout(function () {
                    o.className += " show"
                }, 10), this.close(o, this.delay)
            },
            setup: function (e) {
                function n(n) {
                    "function" != typeof n && (n = function () {}), a && a.addEventListener("click", function (a) {
                        e.onOkay && "function" == typeof e.onOkay && (r ? e.onOkay(r.value, a) : e.onOkay(a)), n(r ? {
                            buttonClicked: "ok",
                            inputValue: r.value,
                            event: a
                        } : {
                            buttonClicked: "ok",
                            event: a
                        }), t(i)
                    }), o && o.addEventListener("click", function (a) {
                        e.onCancel && "function" == typeof e.onCancel && e.onCancel(a), n({
                            buttonClicked: "cancel",
                            event: a
                        }), t(i)
                    }), r && r.addEventListener("keyup", function (e) {
                        13 === e.which && a.click()
                    })
                }
                var i = document.createElement("div");
                i.className = "alertify hide", i.innerHTML = this.build(e);
                var a = i.querySelector(".ok"),
                    o = i.querySelector(".cancel"),
                    r = i.querySelector("input"),
                    l = i.querySelector("label");
                r && ("string" == typeof this.promptPlaceholder && (l ? l.textContent = this.promptPlaceholder : r.placeholder = this.promptPlaceholder), "string" == typeof this.promptValue && (r.value = this.promptValue));
                var s;
                return "function" == typeof Promise ? s = new Promise(n) : n(), this.parent.appendChild(i), setTimeout(function () {
                    i.classList.remove("hide"), r && e.type && "prompt" === e.type ? (r.select(), r.focus()) : a && a.focus()
                }, 100), s
            },
            okBtn: function (e) {
                return this.okLabel = e, this
            },
            setDelay: function (e) {
                return e = e || 0, this.delay = isNaN(e) ? this.defaultDelay : parseInt(e, 10), this
            },
            cancelBtn: function (e) {
                return this.cancelLabel = e, this
            },
            setMaxLogItems: function (e) {
                this.maxLogItems = parseInt(e || this.defaultMaxLogItems)
            },
            theme: function (e) {
                switch (e.toLowerCase()) {
                    case "bootstrap":
                        this.dialogs.buttons.ok = "<button class='ok btn btn-primary' tabindex='1'>{{ok}}</button>", this.dialogs.buttons.cancel = "<button class='cancel btn btn-default' tabindex='2'>{{cancel}}</button>", this.dialogs.input = "<input type='text' class='form-control'>";
                        break;
                    case "purecss":
                        this.dialogs.buttons.ok = "<button class='ok pure-button' tabindex='1'>{{ok}}</button>", this.dialogs.buttons.cancel = "<button class='cancel pure-button' tabindex='2'>{{cancel}}</button>";
                        break;
                    case "mdl":
                    case "material-design-light":
                        this.dialogs.buttons.ok = "<button class='ok mdl-button mdl-js-button mdl-js-ripple-effect'  tabindex='1'>{{ok}}</button>", this.dialogs.buttons.cancel = "<button class='cancel mdl-button mdl-js-button mdl-js-ripple-effect' tabindex='2'>{{cancel}}</button>", this.dialogs.input = "<div class='mdl-textfield mdl-js-textfield'><input class='mdl-textfield__input'><label class='md-textfield__label'></label></div>";
                        break;
                    case "angular-material":
                        this.dialogs.buttons.ok = "<button class='ok md-primary md-button' tabindex='1'>{{ok}}</button>", this.dialogs.buttons.cancel = "<button class='cancel md-button' tabindex='2'>{{cancel}}</button>", this.dialogs.input = "<div layout='column'><md-input-container md-no-float><input type='text'></md-input-container></div>";
                        break;
                    case "default":
                    default:
                        this.dialogs.buttons.ok = this.defaultDialogs.buttons.ok, this.dialogs.buttons.cancel = this.defaultDialogs.buttons.cancel, this.dialogs.input = this.defaultDialogs.input
                }
            },
            reset: function () {
                this.parent = document.body, this.theme("default"), this.okBtn(this.defaultOkLabel), this.cancelBtn(this.defaultCancelLabel), this.setMaxLogItems(), this.promptValue = "", this.promptPlaceholder = "", this.delay = this.defaultDelay, this.setCloseLogOnClick(this.closeLogOnClickDefault), this.setLogPosition("bottom left"), this.logTemplateMethod = null
            },
            injectCSS: function () {
                if (!document.querySelector("#alertifyCSS")) {
                    var e = document.getElementsByTagName("head")[0],
                        t = document.createElement("style");
                    t.type = "text/css", t.id = "alertifyCSS", t.innerHTML = ".alertify-logs>*{padding:12px 24px;color:#fff;box-shadow:0 2px 5px 0 rgba(0,0,0,.2);border-radius:1px}.alertify-logs>*,.alertify-logs>.default{background:rgba(0,0,0,.8)}.alertify-logs>.error{background:rgba(244,67,54,.8)}.alertify-logs>.success{background:rgba(76,175,80,.9)}.alertify{position:fixed;background-color:rgba(0,0,0,.3);left:0;right:0;top:0;bottom:0;width:100%;height:100%;z-index:1}.alertify.hide{opacity:0;pointer-events:none}.alertify,.alertify.show{box-sizing:border-box;transition:all .33s cubic-bezier(.25,.8,.25,1)}.alertify,.alertify *{box-sizing:border-box}.alertify .dialog{padding:12px}.alertify .alert,.alertify .dialog{width:100%;margin:0 auto;position:relative;top:50%;transform:translateY(-50%)}.alertify .alert>*,.alertify .dialog>*{width:400px;max-width:95%;margin:0 auto;text-align:center;padding:12px;background:#fff;box-shadow:0 2px 4px -1px rgba(0,0,0,.14),0 4px 5px 0 rgba(0,0,0,.098),0 1px 10px 0 rgba(0,0,0,.084)}.alertify .alert .msg,.alertify .dialog .msg{padding:12px;margin-bottom:12px;margin:0;text-align:left}.alertify .alert input:not(.form-control),.alertify .dialog input:not(.form-control){margin-bottom:15px;width:100%;font-size:100%;padding:12px}.alertify .alert input:not(.form-control):focus,.alertify .dialog input:not(.form-control):focus{outline-offset:-2px}.alertify .alert nav,.alertify .dialog nav{text-align:right}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button),.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button){background:transparent;box-sizing:border-box;color:rgba(0,0,0,.87);position:relative;outline:0;border:0;display:inline-block;-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;padding:0 6px;margin:6px 8px;line-height:36px;min-height:36px;white-space:nowrap;min-width:88px;text-align:center;text-transform:uppercase;font-size:14px;text-decoration:none;cursor:pointer;border:1px solid transparent;border-radius:2px}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active,.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover{background-color:rgba(0,0,0,.05)}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus{border:1px solid rgba(0,0,0,.1)}.alertify .alert nav button.btn,.alertify .dialog nav button.btn{margin:6px 4px}.alertify-logs{position:fixed;z-index:1}.alertify-logs.bottom,.alertify-logs:not(.top){bottom:16px}.alertify-logs.left,.alertify-logs:not(.right){left:16px}.alertify-logs.left>*,.alertify-logs:not(.right)>*{float:left;transform:translateZ(0);height:auto}.alertify-logs.left>.show,.alertify-logs:not(.right)>.show{left:0}.alertify-logs.left>*,.alertify-logs.left>.hide,.alertify-logs:not(.right)>*,.alertify-logs:not(.right)>.hide{left:-110%}.alertify-logs.right{right:16px}.alertify-logs.right>*{float:right;transform:translateZ(0)}.alertify-logs.right>.show{right:0;opacity:1}.alertify-logs.right>*,.alertify-logs.right>.hide{right:-110%;opacity:0}.alertify-logs.top{top:0}.alertify-logs>*{box-sizing:border-box;transition:all .4s cubic-bezier(.25,.8,.25,1);position:relative;clear:both;backface-visibility:hidden;perspective:1000;max-height:0;margin:0;padding:0;overflow:hidden;opacity:0;pointer-events:none}.alertify-logs>.show{margin-top:12px;opacity:1;max-height:1000px;padding:12px;pointer-events:auto}", e.insertBefore(t, e.firstChild)
                }
            },
            removeCSS: function () {
                var e = document.querySelector("#alertifyCSS");
                e && e.parentNode && e.parentNode.removeChild(e)
            }
        };
        return e.injectCSS(), {
            _$$alertify: e,
            parent: function (t) {
                e.parent = t
            },
            reset: function () {
                return e.reset(), this
            },
            alert: function (t, n, i) {
                return e.dialog(t, "alert", n, i) || this
            },
            confirm: function (t, n, i) {
                return e.dialog(t, "confirm", n, i) || this
            },
            prompt: function (t, n, i) {
                return e.dialog(t, "prompt", n, i) || this
            },
            log: function (t, n) {
                return e.log(t, "default", n), this
            },
            theme: function (t) {
                return e.theme(t), this
            },
            success: function (t, n) {
                return e.log(t, "success", n), this
            },
            error: function (t, n) {
                return e.log(t, "error", n), this
            },
            cancelBtn: function (t) {
                return e.cancelBtn(t), this
            },
            okBtn: function (t) {
                return e.okBtn(t), this
            },
            delay: function (t) {
                return e.setDelay(t), this
            },
            placeholder: function (t) {
                return e.promptPlaceholder = t, this
            },
            defaultValue: function (t) {
                return e.promptValue = t, this
            },
            maxLogItems: function (t) {
                return e.setMaxLogItems(t), this
            },
            closeLogOnClick: function (t) {
                return e.setCloseLogOnClick(!!t), this
            },
            logPosition: function (t) {
                return e.setLogPosition(t || ""), this
            },
            setLogTemplate: function (t) {
                return e.logTemplateMethod = t, this
            },
            clearLogs: function () {
                return e.setupLogContainer().innerHTML = "", this
            },
            version: e.version
        }
    }
    var t = function (e) {
        if (e) {
            var t = function () {
                e && e.parentNode && e.parentNode.removeChild(e)
            };
            e.classList.remove("show"), e.classList.add("hide"), e.addEventListener("transitionend", t), setTimeout(t, 500)
        }
    };
    if ("undefined" != typeof module && module && module.exports) {
        module.exports = function () {
            return new e
        };
        var n = new e;
        for (var i in n) module.exports[i] = n[i]
    } else "function" == typeof define && define.amd ? define(function () {
        return new e
    }) : window.alertify = new e
}();
var url = "",
    api = "",
    token = document.querySelector("#token").getAttribute("value"),
    isLoggedIn = !1,
    isVIP = !1,
    userId = null,
    userDate = null,
    lockAPI = {};
try {
    url = window.location.origin
} catch (e) {
    try {
        url = window.location.protocol + "//" + window.location.host
    } catch (e) {
        url = window.location.href.split("/")[0] + "//" + window.location.host
    }
}
api = url + "/api/v2";
try {
    if (userId = document.querySelector("#user-id").value) {
        isLoggedIn = !0;
        try {
            document.querySelector("#user-vip").value && (isVIP = !0)
        } catch (e) {}
        try {
            userDate = document.querySelector("#user-date").value
        } catch (e) {}
    }
} catch (e) {}
for (var _GLOBAL = {
        _URL: url,
        _API: api,
        _TOKEN: token,
        _IS_LOGGED_IN: isLoggedIn,
        _IS_VIP: isVIP,
        _USER_ID: userId,
        _USER_DATE: userDate
    }, imgDefer = document.getElementsByTagName("img"), i = 0; i < imgDefer.length; i++) imgDefer[i].getAttribute("data-src") && imgDefer[i].setAttribute("src", imgDefer[i].getAttribute("data-src"));
var navbar = getElement("nav"),
    navbarLeft = getElement("#navbar-left"),
    navbarRight = getElement("#navbar-right"),
    navbarToggle = getElement("#navbar-toggle"),
    navbarMenu = getElement(".navbar-menu"),
    navbarSearch = getElement(".navbar-search"),
    userAvatar = getElement("#user-avatar"),
    userTheme = getElement("#user-theme"),
    navbarTab = getElement(".navbar-user-tab"),
    userHeader = getElement(".navbar-user-header"),
    navbarUser = getElement(".navbar-header-user"),
    navbarLoading = navbarRight.querySelector(".loading"),
    floatingAction = getElement(".floating-action"),
    actionToggle = getElement(".action-toggle"),
    actionHome = getElement(".action-home"),
    actionMenu = getElement(".action-menu"),
    actionUser = getElement(".action-user"),
    actionTop = getElement(".action-top"),
    alertifyEl = getElement(".alertify"),
    searchBox = getElement(".search-box input"),
    searchButton = getElement(".search-box .icon"),
    searchResult = getElement(".search-result"),
    searchResultBody = getElement(".result-body"),
    searchLoading = searchResult.querySelector(".loading"),
    searchNoitem = searchResult.querySelector(".result-noitem"),
    cssTheme = document.createElement("link");
cssTheme.id = "dark-theme", cssTheme.rel = "stylesheet", cssTheme.type = "text/css", cssTheme.href = "/css/dark.css?v=" + (new Date).getTime(), window.addEventListener("resize", navbarOnload), window.addEventListener("scroll", hideFloatingAction), window.addEventListener("load", navbarOnload);
for (var i = navbarTab.children.length - 1; i >= 0; i--) clickOnTab(navbarTab.children[i]);
var navbarLeftBrand = document.createElement("div");
navbarLeftBrand.className = "navbar-brand", navbarLeftBrand.innerHTML = '<a class="logo" href="/"><img src="/assets/img/logo.png" alt="VuiGhe.Net"></a>', navbarLeft.appendChild(navbarLeftBrand), userAvatar.onclick = function () {
    activeNavbarRight()
}, navbarToggle.onclick = function () {
    activeNavbarLeft()
};
try {
    userTheme.onclick = function () {
        var e = getElement("#dark-theme"),
            t = {};
        e ? (removeElement(e), t = {
            theme: null
        }) : (document.head.appendChild(cssTheme), t = {
            theme: "dark"
        });
        var n = sendAjax("PUT", _GLOBAL._API + "/users/self/theme", t);
        n.onload = function () {}, n.onerror = function () {}
    }
} catch (e) {}
navbarLeft.querySelector(".navbar-close").onclick = function () {
    navbarLeft.classList.remove("activated"), navbar.style.zIndex = ""
}, navbarRight.querySelector(".navbar-close").onclick = function () {
    navbarRight.classList.remove("activated"), navbar.style.zIndex = ""
}, actionToggle.onclick = function () {
    floatingAction.classList.contains("activated") ? (floatingAction.classList.remove("activated"), this.innerHTML = '<i class="icon-assistive"></i>') : (floatingAction.classList.add("activated"), this.innerHTML = '<i class="icon-close"></i>')
}, actionHome.onclick = function () {
    window.location.href = _GLOBAL._URL
}, actionMenu.onclick = function () {
    activeNavbarLeft()
}, actionUser.onclick = function () {
    activeNavbarRight()
}, actionTop.onclick = function () {
    scrollPageTo(0, 600)
};
var onKeyTimeout, oldQuery = "",
    pointer = null,
    slug = null;
window.addEventListener("click", hideSearchResult), window.addEventListener("resize", setSearchResultHeight), window.addEventListener("load", searchOnLoad), searchBox.onkeyup = function (e) {
    clearTimeout(onKeyTimeout), onKeyTimeout = setTimeout(function () {
        searchFilms()
    }, 200)
}, searchBox.onkeydown = function (e) {
    if (clearTimeout(onKeyTimeout), searchResult.classList.add("activated"), (ismobile.any || window.innerWidth < 1024) && (searchResultBody.style.height = window.innerHeight - 115 + "px"), e.which >= 48 && e.which <= 90 || 8 == e.which || 1 == e.which) searchLoading.classList.remove("hidden"), searchNoitem.classList.add("hidden");
    else {
        if (13 == e.which) return void gotoResultPage(slug);
        27 == e.which && (searchResult.classList.remove("activated"), pointer && (t[pointer].classList.remove("activated"), pointer = null, slug = null, scrollTo(searchResultBody, 0, 100)))
    }
    var t = getAllElements(".result-item");
    if (t.length)
        if (40 != e.which) {
            if (38 == e.which) {
                if (null != pointer && pointer - 1 >= 0 && pointer - 1 < t.length) return t[pointer].classList.remove("activated"), pointer--, slug = t[pointer].getAttribute("data-slug"), t[pointer].classList.add("activated"), void scrollTo(searchResultBody, t[pointer].offsetTop, 100);
                if (0 == pointer) return pointer = null, slug = t[0].getAttribute("data-slug"), void t[0].classList.remove("activated");
                null == pointer && (pointer = t.length - 1, slug = null, t[pointer].classList.add("activated"), scrollTo(searchResultBody, t[pointer].offsetTop, 100))
            }
        } else {
            if (null == pointer) return pointer = 0, slug = t[0].getAttribute("data-slug"), void t[0].classList.add("activated");
            if (pointer + 1 >= t.length) {
                try {
                    t[pointer].classList.remove("activated")
                } catch (e) {}
                return pointer = null, slug = null, void scrollTo(searchResultBody, 0, 100)
            }
            if (pointer + 1 < t.length) {
                try {
                    t[pointer].classList.remove("activated")
                } catch (e) {}
                pointer++, slug = t[pointer].getAttribute("data-slug"), t[pointer].classList.add("activated"), scrollTo(searchResultBody, t[pointer].offsetTop, 100)
            }
        }
}, searchBox.onclick = function (e) {
    searchResult.classList.add("activated"), checkSearchResult()
}, searchBox.onfocus = function (e) {
    searchResult.classList.add("activated"), checkSearchResult()
}, searchButton.onclick = function () {
    gotoResultPage(null)
};
for (var slider = getElement(".slider-container"), sliderItems = getAllElements(".slider-item"), sliders = [], sliderPosition = 0, sliderInterval = 0, sliderCover = getElement(".slider-cover"), sliderTitle = getElement(".slider-title"), sliderViews = getElement(".slider-views"), sliderLink = getElement(".slider-link"), sliderFirstImg = sliderCover.querySelector("img"), i = 0; i < sliderItems.length; i++) sliderItems[i].link = sliderItems[i].querySelector("a"), sliderItems[i].img = sliderItems[i].querySelector("img"), setCoverImage(sliderItems[i], i);
window.addEventListener("load", function () {
    autoNextSlideItem(), createSliderItem()
}), slider.onmouseover = function () {
    clearInterval(sliderInterval)
}, slider.onmouseout = function (e) {
    var t = e.toElement || e.relatedTarget;
    try {
        if (t.parentNode == this || t == this || t == sliderLink || "slider-item-img" == t.className) return
    } catch (e) {}
    for (var n = sliderCover.querySelectorAll("img"), i = 1; i < n.length; i++) n[i].classList.remove("activated");
    sliderItems = getAllElements(".slider-item"), setActivatedItem(sliderItems[n.length - 1]), autoNextSlideItem()
};
var loginButton = document.querySelector("#login"),
    logoutButton = document.querySelector("#logout"),
    signupButton = document.querySelector("#signup"),
    loginTab = document.querySelector(".tab-login"),
    signupTab = document.querySelector(".tab-signup"),
    validated = {
        username: !1,
        password: !1,
        passwordConfirm: !1,
        fullName: !1,
        email: !1,
        birthday: !1
    },
    cachedValidate = {
        username: null,
        fullName: null,
        email: null,
        birthday: null
    },
    cachedNotifications = {};
if (loginButton) {
    loginButton.onclick = function () {
        login()
    }, signupButton.onclick = function () {
        signup()
    };
    var loginUsername = loginTab.querySelector('input[name="username"]'),
        loginPassword = loginTab.querySelector('input[name="password"]'),
        signupUsername = signupTab.querySelector('input[name="username"]'),
        signupPassword = signupTab.querySelector('input[name="password"]'),
        passwordConfirm = signupTab.querySelector('input[name="password_confirm"]'),
        fullName = signupTab.querySelector('input[name="full_name"]'),
        email = signupTab.querySelector('input[name="email"]'),
        birthDate = document.querySelector('input[name="birthday"]'),
        birthMonth = document.querySelector('input[name="birthmonth"]'),
        birthYear = document.querySelector('input[name="birthyear"]'),
        formGroupBirthday = document.querySelector(".navbar-form-group.birthday");
    loginUsername.addEventListener("focusout", function () {
        validateLoginUsername()
    }), loginPassword.addEventListener("focusout", function () {
        validatePassword(loginTab)
    }), signupUsername.addEventListener("focusout", function () {
        validateSignupUsername()
    }), signupPassword.addEventListener("focusout", function () {
        validatePassword(signupTab)
    }), passwordConfirm.addEventListener("focusout", function () {
        validatePasswordConfirm()
    }), fullName.addEventListener("focusout", function () {
        validateFullName()
    }), email.addEventListener("focusout", function () {
        validateEmail()
    }), birthDate.addEventListener("focusout", function () {
        validateBirthDate()
    }), birthMonth.addEventListener("focusout", function () {
        validateBirthMonth()
    }), birthYear.addEventListener("focusout", function () {
        validateBirthYear()
    }), loginUsername.addEventListener("keyup", function (e) {
        try {
            13 == e.which && loginButton.click()
        } catch (e) {}
    }), loginPassword.addEventListener("keyup", function (e) {
        try {
            13 == e.which && loginButton.click()
        } catch (e) {}
    }), window.addEventListener("resize", function () {
        setLoginTabHeight(), ismobile.any || (Ps.update(loginTab), Ps.update(signupTab))
    }), window.addEventListener("load", function () {
        setLoginTabHeight(), ismobile.any || (Ps.initialize(loginTab, {
            minScrollbarLength: 50,
            maxScrollbarLength: 50
        }), Ps.initialize(signupTab, {
            minScrollbarLength: 50,
            maxScrollbarLength: 50
        }))
    })
}
if (logoutButton) {
    logoutButton.onclick = function () {
        logout()
    };
    var informationTab = document.querySelector(".navbar-tab-information"),
        notificationTab = document.querySelector(".navbar-tab-notification"),
        informationBody = document.querySelector(".tab-information"),
        notificationBody = document.querySelector(".tab-notification"),
        notificationList = document.querySelector(".notification-list"),
        notificationMore = document.querySelector(".notification-more"),
        avatarFile = getElement("#avatar-upload");
    avatarFile.onchange = function () {
        try {
            uploadAvatar(avatarFile.files[0])
        } catch (e) {}
    }, notificationTab.addEventListener("click", function () {
        getNotifications()
    }), notificationMore.onclick = function () {
        getNotifications({
            more: !0
        })
    }, window.addEventListener("resize", function () {
        setInfomationTabHeight(), ismobile.any || (Ps.update(informationBody), Ps.update(notificationBody))
    }), window.addEventListener("load", function () {
        setInfomationTabHeight(), ismobile.any || (Ps.initialize(informationBody, {
            minScrollbarLength: 50,
            maxScrollbarLength: 50
        }), Ps.initialize(notificationBody, {
            minScrollbarLength: 50,
            maxScrollbarLength: 50
        }))
    })
}
var trayAllContent = getElement(".tray.all .tray-content"),
    allLoading = getElement(".tray.all .loading"),
    allMore = getElement(".tray.all .tray-more");
window.addEventListener("click", function (e) {
    closeNavbar(e)
}), ismobile.apple.device && window.addEventListener("touchstart", function (e) {
    closeNavbar(e)
}), allMore.onclick = function () {
    getFilms("all")
};