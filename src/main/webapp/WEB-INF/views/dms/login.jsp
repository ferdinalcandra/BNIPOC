<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<jsp:include page="partials/head.jsp" />
<body data-ng-controller="documentController">
	<div class="container-scroller">
		<div class="container-fluid page-body-wrapper full-page-wrapper">
			<div class="content-wrapper d-flex align-items-center auth px-0">
				<div class="row w-100 mx-0">
					<div class="col-lg-4 mx-auto">
						<div class="auth-form-light text-left py-5 px-4 px-sm-5">
							<div class="brand-logo text-center">
								<img
									src="${pageContext.request.contextPath}/resources/assets/images/logo_bni.jpg"
									alt="logo">
							</div>
							<h4 class="text-center">Document Management System</h4>
							<c:url value="/login" var="loginUrl" />
							<form class="pt-3" name="f" action="${loginUrl}" method="post">
								<c:if test="${param.error != null}">
									<div class="alert alert-danger">Invalid Username or
										Password.</div>
								</c:if>
								<c:if test="${param.logout != null}">
									<div th:if="${param.logout}" class="alert alert-success">
										You have been Logged Out.</div>
								</c:if>
								<div class="form-group">
									<label for="exampleInputEmail">Username</label>
									<div class="input-group">
										<div class="input-group-prepend bg-transparent">
											<span class="input-group-text bg-transparent border-right-0">
												<i class="mdi mdi-account-outline text-primary"></i>
											</span>
										</div>
										<input type="text"
											class="form-control form-control-lg border-left-0"
											id="username" name="username" placeholder="Username">
									</div>
								</div>
								<div class="form-group">
									<label for="exampleInputPassword">Password</label>
									<div class="input-group">
										<div class="input-group-prepend bg-transparent">
											<span class="input-group-text bg-transparent border-right-0">
												<i class="mdi mdi-lock-outline text-primary"></i>
											</span>
										</div>
										<input type="password" name="password"
											class="form-control form-control-lg border-left-0"
											id="password" placeholder="Password">
									</div>
								</div>
								<input type="hidden" name="${_csrf.parameterName}"
									value="${_csrf.token}" />
								<div class="mt-3">
									<button type="submit"
										class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN
										IN</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<!-- content-wrapper ends -->
		</div>
		<!-- page-body-wrapper ends -->
	</div>
	<!-- container-scroller -->

	<jsp:include page="partials/end_body.jsp" />
</body>
</html>