package com.msi.dmsapp.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.msi.dmsapp.config.SecurityConfig;

@RestController
public class IndexController {
	
	@Autowired
	private SecurityConfig securityConfig;

	@GetMapping("/document")
	public ModelAndView document() {
		return new ModelAndView("dms/document");
	}
	
	@GetMapping("/generate_document")
	public ModelAndView generateDocument() {
		return new ModelAndView("dms/generate_document");
	}
	
	@GetMapping("/")
	public ModelAndView index() {
		return new ModelAndView("/dms/document");
	}
	
	@GetMapping("/login")
	public ModelAndView login(HttpServletRequest request) {
		String referrer = request.getHeader("Referer");
		if (securityConfig.isLogged()) {
			if (referrer != null) {
				if (!referrer.contains("/dms/login")) {
					request.getSession().setAttribute("url_prior_login", referrer);
				} 
			} 
			return new ModelAndView("redirect:/document");
		} else {
			if (referrer != null) {
				if (!referrer.contains("/dms/login")) {
					request.getSession().setAttribute("url_prior_login", referrer);
				} 
			}
		}
		return new ModelAndView("/dms/login");
	}

}
