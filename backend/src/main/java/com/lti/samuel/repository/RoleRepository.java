package com.lti.samuel.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lti.samuel.domain.Role;

public interface RoleRepository extends JpaRepository<Role ,Long>{
	
	Role findByName(String name);
}
