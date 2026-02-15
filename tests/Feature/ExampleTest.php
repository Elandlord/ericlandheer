<?php

namespace Tests\Feature;

use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_homepage_is_available(): void
    {
        $response = $this->get(route('pages.home'));

        $response->assertOk();
        $response->assertSee('Interactive Resume');
        $response->assertDontSee('Blog');
    }

    public function test_blog_root_is_permanently_redirected_to_homepage(): void
    {
        $response = $this->get('/blog');

        $response->assertStatus(301);
        $response->assertRedirect('/');
    }

    public function test_blog_subpaths_are_permanently_redirected_to_homepage(): void
    {
        $response = $this->get('/blog/outdated-post');

        $response->assertStatus(301);
        $response->assertRedirect('/');
    }
}
