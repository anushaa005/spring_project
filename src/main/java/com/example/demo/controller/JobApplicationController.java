package com.example.demo.controller;

import com.example.demo.dto.JobAppRequest;
import com.example.demo.dto.JobAppResponse;
import com.example.demo.enums.Status;
import com.example.demo.model.JobApplication;
import com.example.demo.repository.JobRepository;
import com.example.demo.response.ApiResponse;
import com.example.demo.service.JobApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/app")
@RequiredArgsConstructor
public class JobApplicationController
{
    private final JobApplicationService jobApplicationService;
    private final JobRepository jobRepository;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> apply(@RequestBody JobAppRequest request)
    {
        return ResponseEntity.status(HttpStatus.CREATED).body(jobApplicationService.apply(request));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<JobAppResponse>>> getApplicationByUser(@PathVariable int userId)
 {
    return ResponseEntity.status(HttpStatus.OK).body(jobApplicationService.getApplicationByUser(userId));
 }

   @GetMapping("/job/{jobId}")
    public ResponseEntity<ApiResponse<List<JobAppResponse>>> getApplicationByJob(@PathVariable int jobId)
   {
       return ResponseEntity.status(HttpStatus.OK).body(jobApplicationService.getApplicationByJob(jobId));
   }

   @PutMapping("/status/{applicationId}")
   public ResponseEntity<ApiResponse<Void>> updateApplicationStatus(@PathVariable int applicationId, @RequestBody Status status)
   {
       return ResponseEntity.ok(jobApplicationService.updateApplicationStatus(applicationId,status));
   }
}