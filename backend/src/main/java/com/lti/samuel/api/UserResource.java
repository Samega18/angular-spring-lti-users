package com.lti.samuel.api;

import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lti.samuel.domain.User;
import com.lti.samuel.service.UserService;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController 
@RequestMapping(value = "/user")
@RequiredArgsConstructor
public class UserResource {

	private final UserService userService;
    
//    @GetMapping("/get")
//	public ResponseEntity<?> getUser(@RequestBody User user){
//		
//		try {
//			
//			userService.updateUser(user);
//			return ResponseEntity.ok().body("User updated");
//			
//		} catch (Exception e) {
//			// TODO: handle exception
//			throw new ResponseStatusException(
//			           HttpStatus.NOT_MODIFIED, "ERRO", e);
//		}
//		
//	}
    
    @GetMapping("/get-user-token")
	public ResponseEntity<User>getUserToken(@RequestParam("token") String token){
		DecodedJWT jwt;
		String username = null;
		String tokenValue = token;
		
		try {
			jwt = JWT.decode(tokenValue);
			username = jwt.getSubject();
		} catch (JWTDecodeException e){
		    //Invalid token
			throw new ResponseStatusException(
			           HttpStatus.NOT_ACCEPTABLE, "ERRO", e);
		}
		
		User user = userService.getUser(username);
		user.setPassword(null);
		
		return ResponseEntity.ok().body(user);
		
	}
    
    @GetMapping("/get-all/id")
	public Page<User> getAll(Pageable pageable){
		
    	return userService.getAll(pageable);
		
	}
    
    @GetMapping("/get-all/name")
	public Page<User> getAllByName(Pageable pageable, @RequestParam("content") String value){
		
    	return userService.findByCategorie("name", value, pageable);
		
	}
    
    @GetMapping("/get-all/username")
	public Page<User> getAllByUsername(Pageable pageable, @RequestParam("content") String value){
		
    	return userService.findByCategorie("username", value, pageable);
		
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody User user, HttpServletResponse response){
		try {
			URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/register").toUriString());
			
			String res = userService.saveUser(user);
			
			if(res == "Saved") {
				
				return ResponseEntity.created(uri).body("Saved");
				
			}else if(res == "UserExists") {
				throw new Exception("UserExists");
			}
			
			
		} catch (Exception e) {
			// TODO: handle exception
			throw new ResponseStatusException(
			           HttpStatus.CONFLICT, "User Exists Already", e);
		}
		return null;
	}
	
	@PostMapping("/save")
	public ResponseEntity<?> saveUser(@RequestBody User user, @RequestParam("role") String role, HttpServletResponse response){
		try {
			URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/save").toUriString());
			
			String res = userService.saveUserForAdmin(user, role);
			
			if(res == "Saved") {
				
				return ResponseEntity.created(uri).body("Saved");
				
			}else if(res == "UserExists") {
				throw new Exception("UserExists");
			}
			
			
		} catch (Exception e) {
			// TODO: handle exception
			throw new ResponseStatusException(
			           HttpStatus.CONFLICT, "User Exists Already", e);
		}
		return null;
	}
	
	@PostMapping("/update")
	public ResponseEntity<?> updateUser(@RequestBody User user, @RequestParam("role") String role){
		
		try {
			
			userService.updateUser(user);
			return ResponseEntity.ok().body("User updated");
			
		} catch (Exception e) {
			// TODO: handle exception
			throw new ResponseStatusException(
			           HttpStatus.NOT_MODIFIED, "ERRO", e);
		}
		
	}
	
	@PostMapping("/delete")
	public ResponseEntity<?> deleteUser(@RequestBody User user){
		
		try {
			
			userService.deleteUser(user);
			return ResponseEntity.ok().body("User deleted");
			
		} catch (Exception e) {
			// TODO: handle exception
			throw new ResponseStatusException(
			           HttpStatus.NOT_MODIFIED, "ERRO", e);
		}
		
	}
	
	@GetMapping("/token/refresh")
	public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException{
		String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		
		if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			try {
				String refresh_token = authorizationHeader.substring("Bearer ".length());
				Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
				JWTVerifier verifier = JWT.require(algorithm).build();
				DecodedJWT decodedJWT = verifier.verify(refresh_token);
				String email = decodedJWT.getSubject();
				User user = userService.getUser(email);
				String access_token = JWT.create()
						.withSubject(user.getUsername())
						.withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))//Duração de 10 Minutos do token
						.withIssuer(request.getRequestURL().toString())
						//.withClaim("roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
						.sign(algorithm);
				
				Map<String, String> tokens = new HashMap<>();
				tokens.put("access_token", access_token);
				tokens.put("refresh_token", refresh_token);
				response.setContentType(MediaType.APPLICATION_JSON_VALUE);
				new ObjectMapper().writeValue(response.getOutputStream(), tokens);
				
			} catch (Exception e) {
				// TODO: handle exception
				response.setHeader("error", e.getMessage());
				response.setStatus(HttpStatus.FORBIDDEN.value());
				//response.sendError(HttpStatus.FORBIDDEN.value());
				Map<String, String> error = new HashMap<>();
				error.put("error_message", e.getMessage());
				response.setContentType(MediaType.APPLICATION_JSON_VALUE);
				new ObjectMapper().writeValue(response.getOutputStream(), error);
			}
			
		} else {
			throw new RuntimeException("Refresh token is missing");
		}
		
	}
	
	@Data
	public class TokenData{
		String token;
	}
	
}
