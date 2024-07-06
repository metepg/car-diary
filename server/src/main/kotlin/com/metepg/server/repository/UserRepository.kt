package com.metepg.server.repository

import com.metepg.server.model.User
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface UserRepository : JpaRepository<User, Int> {

    fun findUserByName(name: String): Optional<User>
}
