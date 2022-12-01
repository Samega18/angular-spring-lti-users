package com.lti.samuel.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lti.samuel.domain.User;
import com.lti.samuel.repository.RoleRepository;
import com.lti.samuel.repository.UserRepository;
import com.lti.samuel.domain.Role;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service @RequiredArgsConstructor @Transactional @Slf4j
public class UserService implements UserDetailsService{
	
	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
			
		User user = userRepository.findByUsername(username);
		if(user == null) {
			log.error("User not found in the database: {}", username);
			throw new UsernameNotFoundException("User not found in the database");
			
		} else {
			log.info("User found in the database: {}", username);
		}
		
		Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
		user.getRoles().forEach(role -> { 
			authorities.add(new SimpleGrantedAuthority(role.getName())); 
		});
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
			
	}
	
	public User getUser(String username) {
		// TODO Auto-generated method stub
		log.info("Fetching user {}", username);
		return userRepository.findByUsername(username);
	}
	
	public Page<User> getAll(Pageable pageable){
		Page<User> result = userRepository.findAll(pageable);
		return result;
	}
	
	public Page<User> findByCategorie(String categorie, String value, Pageable pageable) {
		Page<User> result = null;
		
		if(categorie.equals("name")) {
			
			result = userRepository.findByNameContaining(value, pageable);
			
		}else if(categorie.equals("username")) {
			
			result = userRepository.findByUsernameContaining(value, pageable);
			
		}
		
		return result;
	}
	
	public String saveUser(User user) {
		// TODO Auto-generated method stub
		if(userRepository.findByUsername(user.getUsername()) == null) {
			log.info("Saving new user {} to the database", user.getUsername());
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			userRepository.save(user);
			addRoleToUser(user.getUsername(), "ROLE_USER");
			return "Saved";
		} else {
			log.info("Já existe: {}", user);
			return "UserExists";
		}
		
	}
	
	public String saveUserForAdmin(User user, String role) {
		// TODO Auto-generated method stub
		if(userRepository.findByUsername(user.getUsername()) == null) {
			log.info("Saving new user {} to the database", user.getUsername());
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			userRepository.save(user);
			
			if("admin".equals(role)) {
				addRoleToUser(user.getUsername(), "ROLE_ADMIN");
			}else {
				addRoleToUser(user.getUsername(), "ROLE_USER");
			}
			
			
//			for (Role role : roles) {
//				addRoleToUser(user.getUsername(), role.getName());
//			}	
			
			return "Saved";
		} else {
			log.info("Já existe: {}", user);
			return "UserExists";
		}
		
	}
	
	public String saveUserForApp(User user) {
		// TODO Auto-generated method stub
		if(userRepository.findByUsername(user.getUsername()) == null) {
			log.info("Saving new user {} to the database", user.getName());
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			User user2 = user;
			user2.setRoles(null);
			userRepository.save(user2);
			
			return "Saved";
		} else {
			log.info("Já existe: {}", user);
			return "UserExists";
		}
		
	}
	
	public User updateUser(User user) {
		// TODO Auto-generated method stub
		User userUpdate = userRepository.findByUsername(user.getUsername());
		user.setPassword(userUpdate.getPassword());
		Role first = user.getRoles().iterator().next();
		
		userRepository.save(new User(null, user.getName(), user.getUsername(), user.getPassword(), null));
		
		
		addRoleToUser(user.getUsername(), first.getName());
		
		
		return user;
	}
	
	public void deleteUser(User user) {
		// TODO Auto-generated method stub
		userRepository.delete(user);
	}
	
	public Role saveRole(Role role) {
		// TODO Auto-generated method stub
		log.info("Saving new role {} to the database", role.getName());
		return roleRepository.save(role);
	}

	public void addRoleToUser(String username, String roleName) {
		// TODO Auto-generated method stub
		log.info("Adding role {} to user {}", roleName, username);
		User user = userRepository.findByUsername(username);
		Role role = roleRepository.findByName(roleName);
		
		user.getRoles().add(role);
	}
}
