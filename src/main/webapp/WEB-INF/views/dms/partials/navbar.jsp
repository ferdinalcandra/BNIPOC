<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
	<div class="navbar-brand-wrapper d-flex justify-content-center">
		<div
			class="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">
			<a class="navbar-brand brand-logo" href="index.html"><img
				src="${pageContext.request.contextPath}/resources/assets/images/logo_bni.jpg"
				alt="logo" /></a> <a class="navbar-brand brand-logo-mini"
				href="index.html"><img
				src="${pageContext.request.contextPath}/resources/assets/images/logo_bni_small.jpg"
				alt="logo" /></a>
			<button class="navbar-toggler navbar-toggler align-self-center"
				type="button" data-toggle="minimize">
				<span class="mdi mdi-sort-variant"></span>
			</button>
		</div>
	</div>
	<div
		class="navbar-menu-wrapper d-flex align-items-center justify-content-end">

		<ul class="navbar-nav navbar-nav-right">
			<li class="nav-item nav-profile dropdown"><a
				class="nav-link dropdown-toggle" href="#" data-toggle="dropdown"
				id="profileDropdown"> <img
					src="${pageContext.request.contextPath}/resources/assets/images/logo_profile.jpg"
					alt="profile" /> <span class="nav-profile-name">Username</span>
			</a>
				<div class="dropdown-menu dropdown-menu-right navbar-dropdown"
					aria-labelledby="profileDropdown">
					<a class="dropdown-item" href="logout"> <i
						class="mdi mdi-logout text-primary"></i> Logout
					</a>
				</div></li>
		</ul>
		<button
			class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
			type="button" data-toggle="offcanvas">
			<span class="mdi mdi-menu"></span>
		</button>
	</div>
</nav>