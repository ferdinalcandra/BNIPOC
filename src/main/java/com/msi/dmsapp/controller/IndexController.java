package com.msi.dmsapp.controller;

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

	@GetMapping("/documentCountView")
	public ModelAndView documentCountView() {
		return new ModelAndView("dms/documentCountView");
	}
	
	@GetMapping("/")
	public ModelAndView index() {
		return new ModelAndView("/dms/document");
	}
	
	@GetMapping("/login")
	public ModelAndView login() {
		if (securityConfig.isLogged()) {
			return new ModelAndView("redirect:/document");
		} else {
			return new ModelAndView("/dms/login");
		}
	}

}
