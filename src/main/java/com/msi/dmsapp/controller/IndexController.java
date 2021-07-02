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
	
	@GetMapping("/")
	public ModelAndView index() {
		return new ModelAndView("/dms/document");
	}
	
	@GetMapping("/login")
	public ModelAndView login(HttpServletRequest request) {
		String referrer = request.getHeader("Referer");
		if (referrer != null) {
			if (!referrer.contains("/dms/login")) {
				request.getSession().setAttribute("url_prior_login", referrer);
			} else {
				return new ModelAndView("/dms/login");
			}
		}
//		return new ModelAndView("/dms/login");
		if (securityConfig.isLogged()) {
			return new ModelAndView("redirect:/document");
		} else {
			return new ModelAndView("/dms/login");
		}
	}

}
