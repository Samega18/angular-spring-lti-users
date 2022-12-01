package com.lti.samuel.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.lti.samuel.domain.User;

public interface UserRepository extends JpaRepository<User ,Long>{

	User findByUsername(String username);

	Page<User> findByNameContaining(String name, Pageable pageable);

	Page<User> findByUsernameContaining(String username, Pageable pageable);
	
}
