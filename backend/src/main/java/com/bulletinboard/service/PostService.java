package com.bulletinboard.service;

import com.bulletinboard.model.Post;
import com.bulletinboard.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public List<Post> getPosts(String category, LocalDateTime startDate, LocalDateTime endDate) {
        return postRepository.findByFilters(
            category != null ? category : null,
            startDate != null ? startDate : null,
            endDate != null ? endDate : null);
    }

    // public List<Post> getPosts() {
    //     return postRepository.findAll();
    // }

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}
