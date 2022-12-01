package com.lti.samuel;

import java.util.ArrayList;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.lti.samuel.domain.Role;
import com.lti.samuel.domain.User;
import com.lti.samuel.service.UserService;

@SpringBootApplication
public class SamuelApplication {

	public static void main(String[] args) {
		SpringApplication.run(SamuelApplication.class, args);
	}
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean 
	CommandLineRunner run(UserService userService) { return args -> {
		  userService.saveRole(new Role(null, "ROLE_ADMIN")); 
		  userService.saveRole(new Role(null, "ROLE_USER"));
		  
		//userService.saveUser(new User(id, name, username, password, roles));
		  userService.saveUserForApp(new User(null, "Samuel Marques", "Samega", "123456", null));
		  userService.saveUserForApp(new User(null, "Gustavo Pires", "Gustavo123", "senha123", null)); 
		  userService.saveUserForApp(new User(null, "Daniel Abella", "Abella456", "senha456", null)); 
		  userService.saveUserForApp(new User(null, "Will Smith1", "Willzinho1", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith2", "Willzinho2", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith3", "Willzinho3", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith4", "Willzinho4", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith5", "Willzinho5", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith6", "Willzinho6", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith7", "Willzinho7", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith8", "Willzinho8", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith9", "Willzinho9", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith10", "Willzinho10", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith11", "Willzinho11", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith12", "Willzinho12", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith13", "Willzinho13", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith14", "Willzinho14", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith15", "Willzinho15", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith16", "Willzinho16", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith17", "Willzinho17", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith18", "Willzinho18", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith19", "Willzinho19", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith20", "Willzinho20", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith21", "Willzinho21", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith22", "Willzinho22", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith23", "Willzinho23", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith24", "Willzinho24", "pass789", null));
		  userService.saveUserForApp(new User(null, "Will Smith25", "Willzinho25", "pass789", null));
		  
		  
		  userService.addRoleToUser("Samega", "ROLE_ADMIN");
		  userService.addRoleToUser("Gustavo123", "ROLE_ADMIN");
		  userService.addRoleToUser("Abella456", "ROLE_ADMIN");
		  userService.addRoleToUser("Willzinho1", "ROLE_USER");
		  userService.addRoleToUser("Willzinho2", "ROLE_USER");
		  userService.addRoleToUser("Willzinho3", "ROLE_USER");
		  userService.addRoleToUser("Willzinho4", "ROLE_USER");
		  userService.addRoleToUser("Willzinho5", "ROLE_USER");
		  userService.addRoleToUser("Willzinho6", "ROLE_USER");
		  userService.addRoleToUser("Willzinho7", "ROLE_USER");
		  userService.addRoleToUser("Willzinho8", "ROLE_USER");
		  userService.addRoleToUser("Willzinho9", "ROLE_USER");
		  userService.addRoleToUser("Willzinho10", "ROLE_USER");
		  userService.addRoleToUser("Willzinho11", "ROLE_USER");
		  userService.addRoleToUser("Willzinho12", "ROLE_USER");
		  userService.addRoleToUser("Willzinho13", "ROLE_USER");
		  userService.addRoleToUser("Willzinho14", "ROLE_USER");
		  userService.addRoleToUser("Willzinho15", "ROLE_USER");
		  userService.addRoleToUser("Willzinho16", "ROLE_USER");
		  userService.addRoleToUser("Willzinho17", "ROLE_USER");
		  userService.addRoleToUser("Willzinho18", "ROLE_USER");
		  userService.addRoleToUser("Willzinho19", "ROLE_USER");
		  userService.addRoleToUser("Willzinho20", "ROLE_USER");
		  userService.addRoleToUser("Willzinho21", "ROLE_USER");
		  userService.addRoleToUser("Willzinho22", "ROLE_USER");
		  userService.addRoleToUser("Willzinho23", "ROLE_USER");
		  userService.addRoleToUser("Willzinho24", "ROLE_USER");
		  userService.addRoleToUser("Willzinho25", "ROLE_USER");
	  
	};}

}
