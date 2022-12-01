package com.lti.samuel.filter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;

@Slf4j @Service @RequiredArgsConstructor @Transactional
public class CustomJwtFilter {
	
	public boolean checkTokenExpired(String token){
		
		boolean value = false;
		
		DecodedJWT jwt = JWT.decode(token);
		if( jwt.getExpiresAt().before(new Date())) {
		    value = true;
		}
		
		return value;
	}

}
