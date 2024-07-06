package com.metepg.server

import com.metepg.server.repository.UserRepository
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component

@Component
class CustomAuthProvider(
    private val repository: UserRepository,
    private val encoder: PasswordEncoder
) : AuthenticationProvider {

    private val logger: Logger = LoggerFactory.getLogger(CustomAuthProvider::class.java)

    @Throws(AuthenticationException::class)
    override fun authenticate(authentication: Authentication): Authentication {
        val name = authentication.name
        val password = authentication.credentials.toString()

        val user = repository.findUserByName(name)
            .orElseThrow { BadCredentialsException("Väärä nimi tai salasana") }

        if (encoder.matches(password, user.password)) {
            logger.info("Successfully Authenticated the user")
            val role = user.role

            return UsernamePasswordAuthenticationToken(name, password, role?.let { getUserRoles(it) })
        } else {
            throw BadCredentialsException("Väärä nimi tai salasana")
        }
    }

    private fun getUserRoles(userRole: String): List<GrantedAuthority> {
        val grantedAuthorityList = mutableListOf<GrantedAuthority>()
        logger.info("Role: {}", userRole)
        val fullRole = "ROLE_$userRole"
        grantedAuthorityList.add(SimpleGrantedAuthority(fullRole))
        return grantedAuthorityList
    }

    override fun supports(authentication: Class<*>): Boolean {
        return authentication == UsernamePasswordAuthenticationToken::class.java
    }
}
