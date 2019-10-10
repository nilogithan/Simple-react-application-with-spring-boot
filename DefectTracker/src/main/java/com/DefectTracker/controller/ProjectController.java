package com.DefectTracker.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DefectTracker.Exception.ResourceNotFoundException;
import com.DefectTracker.model.Project;
import com.DefectTracker.repository.ProjectRepository;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200", "http://localhost:3003", "http://localhost:3002", "http://localhost:3001" })
@RestController
@RequestMapping("/project/api/v1")
public class ProjectController {
	@Autowired
	private ProjectRepository projectRepo;

	@GetMapping("/project")
	public Page<Project> getProjects(Pageable pageable) {
		return projectRepo.findAll(pageable);
	}

	@PostMapping("/project")
	public Project saveProjects(@Valid @RequestBody Project project) {
		return projectRepo.save(project);
	}
	@PutMapping("/project/{projectId}")
	public Project update(@PathVariable Long projectId, @Valid @RequestBody Project req) {
		return projectRepo.findById(projectId).map(postReq -> {
			postReq.setName(req.getName());
			postReq.setDescription(req.getDescription());
			return projectRepo.save(postReq);
		}).orElseThrow(() -> new ResourceNotFoundException("projectId " + projectId + " not found"));
	}
	
	@DeleteMapping("/project/{projectId}")
	public ResponseEntity<?> deleteProject(@PathVariable Long projectId){
		return projectRepo.findById(projectId).map(req -> {
			projectRepo.delete(req);
			return ResponseEntity.ok().build();
		}).orElseThrow(() -> new ResourceNotFoundException("projectId " + projectId + " not found"));
	}
	
}
