package com.bulletinboard.controller;

import com.bulletinboard.model.Post;
import com.bulletinboard.service.PostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping
    public Post createPost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    @GetMapping
    public List<Post> getPosts(@RequestParam(required = false) String category,
                               @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
                                    LocalDateTime startDate,
                               @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
                                    LocalDateTime endDate) {
        return postService.getPosts(category, startDate, endDate);
    }

    @DeleteMapping("/{postId}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }
}
