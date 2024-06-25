package com.bulletinboard.service;

import com.bulletinboard.model.Post;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@ActiveProfiles("test")
public class PostServiceTest {

    @Autowired
    private PostService postService;

    @Test
    public void testGetPosts() {
        List<Post> posts = postService.getPosts(null, null, null);
        assertNotNull(posts);
        assertEquals(8, posts.size());

    //     posts = postService.getPosts("Category1", null, null);
    //     assertNotNull(posts);
    //     assertEquals(1, posts.size());
    //     assertEquals("Test Post 1", posts.get(0).getTitle());

    //     LocalDateTime startDate = LocalDateTime.now().minusDays(3);
    //     LocalDateTime endDate = LocalDateTime.now();
    //     posts = postService.getPosts(null, startDate.toString(), endDate.toString());
    //     assertNotNull(posts);
    //     assertEquals(2, posts.size());

    //     posts = postService.getPosts(null, startDate.toString(), LocalDateTime.now().minusDays(1).toString());
    //     assertNotNull(posts);
    //     assertEquals(1, posts.size());
    //     assertEquals("Test Post 2", posts.get(0).getTitle());
    }
}
