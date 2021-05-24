package com.br.ecommerce.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecutiryConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.authorizeRequests()
                .antMatchers("/api/orders/**")
                .authenticated()
                .and()
                .httpBasic()
                .and()
                .csrf()
                .disable()
                .oauth2ResourceServer()
                .jwt();

        http.cors();

        Okta.configureResourceServer401ResponseBody(http);
    }
}
