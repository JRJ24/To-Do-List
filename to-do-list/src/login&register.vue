<script setup>
import { ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes } from './config/index.js'

const activeTab = ref('login')

// Datos del login
const loginEmail = ref('')
const loginPassword = ref('')

// Datos del registro
const fullName = ref('')
const email = ref('')
const password = ref('')

// Funciones
const handleLogin = async() => {
    try {
        const response = await fetch(`${Routes.Login}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: loginEmail.value, password: loginPassword.value })
        })
        if (!response.ok) {
            throw new Error('Error al iniciar sesión')
        }
        const data = await response.json();
        localStorage.setItem('usuarioID', data.data._id);
        window.location.href = '/app';
    } catch (error) {
        console.log(error)
    }
}

const handleRegister = async() => {
    try {
        const response = await fetch(`${Routes.Register}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullName: fullName.value, email: email.value, password: password.value })
        })
        if (!response.ok) {
            throw new Error('Error al registrar el usuario')
        }
        await response.json();
        activeTab.value = 'login'
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
  <div class="container mt-5" style="max-width: 500px;">
    <div class="card shadow-lg p-4 rounded-4">
      <ul class="nav nav-tabs mb-3">
        <li class="nav-item">
          <button
            class="nav-link"
            :class="{ active: activeTab === 'login' }"
            @click="activeTab = 'login'"
          >
            Login
          </button>
        </li>
        <li class="nav-item">
          <button
            class="nav-link"
            :class="{ active: activeTab === 'register' }"
            @click="activeTab = 'register'"
          >
            Registro
          </button>
        </li>
      </ul>

      <!-- Login -->
      <div v-if="activeTab === 'login'">
        <h3 class="mb-3">Iniciar Sesión</h3>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="loginEmail" type="email" class="form-control" placeholder="ejemplo@mail.com">
        </div>
        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input v-model="loginPassword" type="password" class="form-control" placeholder="********">
        </div>
        <button class="btn btn-success w-100" @click="handleLogin" v-if="activeTab === 'login'">Entrar</button>
      </div>

      <!-- Registro -->
      <div v-if="activeTab === 'register'">
        <h3 class="mb-3">Crear Cuenta</h3>
        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input v-model="fullName" type="text" class="form-control" placeholder="Tu nombre">
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" placeholder="ejemplo@mail.com">
        </div>
        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input v-model="password" type="password" class="form-control" placeholder="********">
        </div>
        <button class="btn btn-primary w-100" @click="handleRegister">Registrarse</button>
      </div>
    </div>
  </div>
</template>

