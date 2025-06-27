import React, { useState, useEffect } from "react";

// Стили
const styles = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
  transition: all 0.3s ease;
}

.app.dark-mode {
  background: #0a0a0a;
  color: #fff;
}

/* Шапка */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #000;
  z-index: 1000;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
}

.dark-mode .header {
  background: #000;
  border-bottom: 1px solid #222;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.logo {
  cursor: pointer;
  transition: transform 0.3s;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo:hover {
  transform: scale(1.05);
}

.hub-logo {
  width: 50px;
  height: 50px;
  background: #E89923;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.6rem;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  letter-spacing: -1px;
  position: relative;
}

.hub-logo-icon {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 20px;
  height: 20px;
  background: #1a1a1a;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
}

.hub-logo-icon::before {
  content: '';
  width: 12px;
  height: 2px;
  background: #E89923;
  border-radius: 1px;
  position: absolute;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%);
}

.hub-logo-icon::after {
  content: '';
  width: 2px;
  height: 8px;
  background: #E89923;
  border-radius: 1px;
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
}

.logo-text {
  color: white;
  font-size: 0.9rem;
  font-weight: 300;
  letter-spacing: 1px;
  opacity: 0.8;
}

/* Навигация */
.desktop-nav {
  display: none;
  gap: 2rem;
}

.desktop-nav button {
  background: none;
  border: none;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  padding: 0.5rem 0;
}

.desktop-nav button:hover {
  color: #f39c12;
}

.desktop-nav button.active {
  color: #f39c12;
}

.desktop-nav button.active::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  height: 2px;
  background: #f39c12;
}

.header-controls {
  display: flex;
  gap: 0.5rem;
}

.header button {
  background: none;
  border: none;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.3s;
  color: #fff;
}

.header button:hover {
  background: #222;
}

.lang-btn, .theme-btn, .menu-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* Мобильное меню */
.mobile-menu {
  background: #000;
  border-top: 1px solid #222;
  padding: 1rem;
}

.mobile-menu button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  text-align: left;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s;
  color: #fff;
}

.mobile-menu button:hover,
.mobile-menu button.active {
  color: #f39c12;
}

/* Основной контент */
.main {
  flex: 1;
  margin-top: 80px;
}

.page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hero секция */
.hero {
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  padding: 4rem 0;
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.hero h1 {
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: #000;
}

.dark-mode .hero h1 {
  color: #fff;
}

.hero p {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  color: #666;
  line-height: 1.6;
}

.dark-mode .hero p {
  color: #aaa;
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.hero-visual {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Вендинговая машина */
.vending-machine {
  width: 380px;
  height: 650px;
  background: #1a1a1a;
  border-radius: 20px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: visible;
  display: flex;
  flex-direction: column;
}

.machine-dispenser {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 280px;
  height: 90px;
  background: #0a0a0a;
  border-radius: 15px;
  padding: 5px;
  box-shadow: inset 0 10px 20px rgba(0, 0, 0, 0.8);
}

/* Кнопки */
.btn-primary, .btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-primary {
  background: #f39c12;
  color: white;
}

.btn-primary:hover {
  background: #e67e22;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(243, 156, 18, 0.3);
}

.btn-secondary {
  background: transparent;
  color: #000;
  border: 2px solid #000;
}

.dark-mode .btn-secondary {
  color: #fff;
  border-color: #fff;
}

.btn-secondary:hover {
  background: #000;
  color: #fff;
}

.dark-mode .btn-secondary:hover {
  background: #fff;
  color: #000;
}

/* Статистика */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
}

.stat {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 20px;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.dark-mode .stat {
  background: #111;
  border-color: #222;
}

.stat:hover {
  transform: translateY(-10px);
  border-color: #f39c12;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.stat h3 {
  font-size: 3rem;
  font-weight: 900;
  color: #f39c12;
  margin: 1rem 0;
}

.stat p {
  color: #666;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.dark-mode .stat p {
  color: #aaa;
}

/* Промо-секция */
.promotions {
  margin: 4rem 0;
}

.promotions h2 {
  font-size: 2.5rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 3rem;
  color: #000;
}

.dark-mode .promotions h2 {
  color: #fff;
}

.promo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.promo-card {
  background: #f39c12;
  color: #fff;
  padding: 2.5rem;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}

.promo-card::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  to { transform: rotate(360deg); }
}

.promo-card:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 40px rgba(243, 156, 18, 0.3);
}

.promo-card h3 {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 1rem;
  position: relative;
}

.promo-card p {
  font-size: 1.1rem;
  position: relative;
  opacity: 0.9;
}

.promo-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-top: 1rem;
  font-weight: 600;
  position: relative;
}

/* Новости */
.news {
  margin: 4rem 0;
}

.news h2 {
  font-size: 2.5rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 3rem;
  color: #000;
}

.dark-mode .news h2 {
  color: #fff;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.news-card {
  background: #f8f9fa;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  border: 2px solid transparent;
}

.dark-mode .news-card {
  background: #111;
  border-color: #222;
}

.news-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-color: #f39c12;
}

.news-image {
  height: 200px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
}

.news-card h3 {
  color: #000;
  margin: 1.5rem;
  font-size: 1.3rem;
  font-weight: 800;
}

.dark-mode .news-card h3 {
  color: #fff;
}

.news-card p {
  margin: 0 1.5rem;
  color: #666;
  line-height: 1.6;
}

.dark-mode .news-card p {
  color: #aaa;
}

.news-card small {
  display: block;
  margin: 1.5rem;
  color: #999;
  font-weight: 600;
}

/* Страница автоматов */
.machine-card {
  background: #f8f9fa;
  border-radius: 30px;
  overflow: hidden;
  margin-bottom: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  transition: all 0.3s;
}

.dark-mode .machine-card {
  background: #111;
  border-color: #222;
}

.machine-card:hover {
  border-color: #f39c12;
  transform: translateY(-5px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.machine-header {
  background: #000;
  color: #fff;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.machine-icon {
  font-size: 4rem;
}

.machine-card h2 {
  font-size: 2rem;
  font-weight: 800;
  color: #f39c12;
}

.machine-visual {
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: #fff;
}

.dark-mode .machine-visual {
  background: #000;
}

.machine-description {
  padding: 2rem;
  font-size: 1.1rem;
  color: #666;
  line-height: 1.8;
}

.dark-mode .machine-description {
  color: #aaa;
}

.machine-card h3 {
  color: #000;
  margin: 0 2rem 1.5rem;
  font-size: 1.5rem;
  font-weight: 800;
}

.dark-mode .machine-card h3 {
  color: #fff;
}

.machine-specs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem;
  padding: 2rem;
  background: #fff;
  border-radius: 20px;
}

.dark-mode .machine-specs {
  background: #000;
}

.spec {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 10px;
  transition: all 0.3s;
}

.spec:hover {
  background: #f39c120a;
}

.spec-icon {
  font-size: 1.5rem;
}

.spec span:last-child {
  color: #666;
  font-size: 0.95rem;
}

.dark-mode .spec span:last-child {
  color: #aaa;
}

.products {
  padding: 0 2rem 2rem;
  display: grid;
  gap: 1rem;
}

.product-with-desc {
  background: #fff;
  padding: 1.5rem;
  border-radius: 15px;
  display: flex;
  gap: 1.5rem;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.dark-mode .product-with-desc {
  background: #000;
  border-color: #222;
}

.product-with-desc:hover {
  transform: translateX(10px);
  border-color: #f39c12;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.product-icon {
  font-size: 2.5rem;
  line-height: 1;
}

.product-content {
  flex: 1;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  gap: 1rem;
}

.product-name {
  font-weight: 800;
  color: #000;
  font-size: 1.2rem;
}

.dark-mode .product-name {
  color: #fff;
}

.product-desc {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.5;
}

.dark-mode .product-desc {
  color: #aaa;
}

.price {
  color: #f39c12;
  font-weight: 900;
  white-space: nowrap;
  font-size: 1.3rem;
}

/* Страница локаций */
.locations-container {
  margin-top: 2rem;
}

.map-container {
  height: 500px;
  background: #f0f0f0;
  border-radius: 20px;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
}

.map-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f5f5 25%, #e0e0e0 25%, #e0e0e0 50%, #f5f5f5 50%, #f5f5f5 75%, #e0e0e0 75%, #e0e0e0);
  background-size: 20px 20px;
  animation: move 1s linear infinite;
}

@keyframes move {
  0% { background-position: 0 0; }
  100% { background-position: 20px 20px; }
}

.map-text {
  background: white;
  padding: 2rem 3rem;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  font-weight: 600;
  color: #666;
}

.location-controls {
  text-align: center;
  margin-bottom: 3rem;
}

.find-nearest {
  max-width: 400px;
  margin: 0 auto 2rem;
  font-size: 1.1rem;
  padding: 1.2rem 3rem;
}

.find-nearest:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 0.5; }
}

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.8rem 2rem;
  border: 2px solid #ddd;
  background: white;
  border-radius: 30px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
}

.dark-mode .filter-btn {
  background: #111;
  border-color: #333;
  color: #fff;
}

.filter-btn:hover {
  border-color: #f39c12;
  transform: translateY(-2px);
}

.filter-btn.active {
  background: #f39c12;
  color: white;
  border-color: #f39c12;
}

.locations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.location-card {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: all 0.3s;
  animation: slideUp 0.5s ease backwards;
  border: 2px solid transparent;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dark-mode .location-card {
  background: #111;
  border-color: #222;
}

.location-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-color: #f39c12;
}

.location-card.maintenance {
  opacity: 0.7;
}

.location-status {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 1.3rem;
}

.location-info {
  margin-bottom: 1.5rem;
}

.location-card h3 {
  color: #000;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 800;
}

.dark-mode .location-card h3 {
  color: #fff;
}

.location-card p {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
  color: #666;
  font-size: 1rem;
}

.dark-mode .location-card p {
  color: #aaa;
}

.distance-badge {
  display: inline-flex;
  align-items: baseline;
  background: #f39c12;
  color: #fff;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-weight: 700;
  margin-top: 1rem;
}

.distance-number {
  font-size: 1.2rem;
  margin-right: 0.25rem;
}

.distance-unit {
  font-size: 0.9rem;
  opacity: 0.8;
}

.location-types {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.type-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.type-badge.coffee {
  background: #f4e4d4;
  color: #8b4513;
}

.type-badge.ice {
  background: #e6f3ff;
  color: #0066cc;
}

.dark-mode .type-badge {
  opacity: 0.8;
}

.view-menu-btn {
  background: #f39c12;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.view-menu-btn:hover:not(:disabled) {
  background: #e67e22;
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(243, 156, 18, 0.3);
}

.view-menu-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Модальное окно меню */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  border-radius: 30px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(50px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.dark-mode .modal-content {
  background: #111;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem;
  border-bottom: 2px solid #f0f0f0;
  background: #000;
  color: #fff;
}

.dark-mode .modal-header {
  border-color: #222;
}

.modal-header h2 {
  color: #f39c12;
  margin: 0;
  font-size: 1.8rem;
  font-weight: 800;
}

.location-subtitle {
  color: #ccc;
  font-size: 1rem;
  margin-top: 0.5rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  color: #fff;
  transition: transform 0.3s;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  transform: rotate(90deg);
  background: #222;
}

.modal-body {
  padding: 2rem;
  overflow-y: auto;
}

.location-details {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
}

.dark-mode .detail-item {
  color: #aaa;
}

.status {
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-weight: 700;
}

.status.working {
  background: #d4edda;
  color: #155724;
}

.status.maintenance {
  background: #fff3cd;
  color: #856404;
}

.machine-menu {
  margin-bottom: 2rem;
}

.machine-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.dark-mode .machine-menu-header {
  border-color: #222;
}

.machine-menu h3 {
  color: #000;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
}

.dark-mode .machine-menu h3 {
  color: #fff;
}

.product-count {
  color: #666;
  font-size: 1rem;
  font-weight: 600;
}

.dark-mode .product-count {
  color: #aaa;
}

.menu-products {
  display: grid;
  gap: 1rem;
}

.menu-item {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 15px;
  display: flex;
  gap: 1.5rem;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.menu-item:hover {
  background: #fff5eb;
  transform: translateX(10px);
  border-color: #f39c12;
}

.dark-mode .menu-item {
  background: #000;
  border-color: #222;
}

.dark-mode .menu-item:hover {
  background: #1a1a1a;
}

.menu-item-icon {
  font-size: 2rem;
  line-height: 1;
}

.menu-item-content {
  flex: 1;
}

.menu-item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 1rem;
}

.menu-item-name {
  font-weight: 700;
  color: #000;
  font-size: 1.1rem;
}

.dark-mode .menu-item-name {
  color: #fff;
}

.menu-item-price {
  color: #f39c12;
  font-weight: 900;
  white-space: nowrap;
  font-size: 1.2rem;
}

.menu-item-desc {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
}

.dark-mode .menu-item-desc {
  color: #aaa;
}

.modal-footer {
  padding: 1.5rem 2rem;
  background: #f8f9fa;
  border-top: 2px solid #f0f0f0;
}

.dark-mode .modal-footer {
  background: #000;
  border-color: #222;
}

.payment-info {
  text-align: center;
  color: #666;
  font-size: 1rem;
  margin: 0;
  font-weight: 600;
}

.dark-mode .payment-info {
  color: #aaa;
}

/* Страница партнерства */
.partnership-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  margin: 3rem 0;
}

.partnership-card {
  background: #f8f9fa;
  padding: 3rem;
  border-radius: 30px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  border: 2px solid transparent;
}

.dark-mode .partnership-card {
  background: #111;
  border-color: #222;
}

.partnership-card:hover {
  transform: translateY(-10px);
  border-color: #f39c12;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.partnership-icon {
  font-size: 4rem;
  color: #f39c12;
  margin-bottom: 2rem;
}

.partnership-card h2 {
  color: #000;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.dark-mode .partnership-card h2 {
  color: #fff;
}

.partnership-desc {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.dark-mode .partnership-desc {
  color: #aaa;
}

.partnership-features {
  margin: 2rem 0;
}

.feature {
  margin-bottom: 1.5rem;
}

.feature h3 {
  color: #f39c12;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}

.feature-value {
  font-size: 2rem;
  font-weight: 900;
  color: #000;
}

.dark-mode .feature-value {
  color: #fff;
}

.partnership-requirements {
  text-align: left;
  margin: 2rem 0;
}

.partnership-requirements h3 {
  color: #000;
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.dark-mode .partnership-requirements h3 {
  color: #fff;
}

.partnership-requirements ul {
  list-style: none;
}

.partnership-requirements li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: #666;
}

.dark-mode .partnership-requirements li {
  color: #aaa;
}

.partnership-form {
  max-width: 800px;
  margin: 3rem auto;
  background: #f8f9fa;
  padding: 3rem;
  border-radius: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.dark-mode .partnership-form {
  background: #111;
}

.partnership-form h2 {
  text-align: center;
  color: #000;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 2rem;
}

.dark-mode .partnership-form h2 {
  color: #fff;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.partnership-form input,
.partnership-form select,
.partnership-form textarea {
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  font-size: 1rem;
  transition: all 0.3s;
  background: #fff;
}

.dark-mode .partnership-form input,
.dark-mode .partnership-form select,
.dark-mode .partnership-form textarea {
  background: #000;
  border-color: #333;
  color: white;
}

.partnership-form input:focus,
.partnership-form select:focus,
.partnership-form textarea:focus {
  outline: none;
  border-color: #f39c12;
}

.partnership-form textarea {
  margin-bottom: 2rem;
}

/* Страница контактов */
.contacts-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
}

.contact-info,
.contact-form {
  background: #f8f9fa;
  padding: 3rem;
  border-radius: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.dark-mode .contact-info,
.dark-mode .contact-form {
  background: #111;
}

.contact-info h2,
.contact-form h2 {
  color: #000;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 800;
}

.dark-mode .contact-info h2,
.dark-mode .contact-form h2 {
  color: #fff;
}

.contact-item {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #fff;
  border-radius: 15px;
  transition: all 0.3s;
}

.dark-mode .contact-item {
  background: #000;
}

.contact-item:hover {
  transform: translateX(10px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.contact-item p {
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #f39c12;
}

.contact-item a {
  color: #666;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.dark-mode .contact-item a {
  color: #aaa;
}

.contact-item a:hover {
  color: #f39c12;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  font-size: 1rem;
  transition: all 0.3s;
  background: #fff;
}

.dark-mode .contact-form input,
.dark-mode .contact-form textarea {
  background: #000;
  border-color: #333;
  color: white;
}

.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: #f39c12;
  transform: scale(1.02);
}

/* Подвал */
.footer {
  background: #000;
  color: white;
  padding: 4rem 0 2rem;
  margin-top: 6rem;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section h4 {
  color: #f39c12;
  margin-bottom: 1.5rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.footer-hub-logo {
  width: 50px;
  height: 50px;
  background: #f39c12;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.8rem;
  color: white;
  letter-spacing: -2px;
}

.footer-logo-text {
  color: white;
  font-size: 0.9rem;
  font-weight: 300;
  letter-spacing: 1px;
  opacity: 0.8;
}

.footer-desc {
  color: #aaa;
  line-height: 1.8;
  margin-top: 1rem;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 1rem;
}

.footer-section button {
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  transition: color 0.3s;
  font-size: 1rem;
}

.footer-section button:hover {
  color: #f39c12;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #333;
  color: #666;
}

/* Адаптивность */
@media (min-width: 768px) {
  .desktop-nav {
    display: flex;
  }
  
  .menu-btn {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 2rem 0;
  }
  
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .hero-visual {
    display: none;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .contacts-content {
    grid-template-columns: 1fr;
  }
  
  .partnership-grid {
    grid-template-columns: 1fr;
  }
  
  .locations-grid {
    grid-template-columns: 1fr;
  }
  
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .machine-visual {
    transform: scale(0.8);
  }
}
`;

// Компонент логотипа Hub - точная копия оригинала
const HubLogo = ({ size = "medium" }) => {
  const sizes = {
    small: 50,
    medium: 70,
    large: 120
  };
  
  const currentSize = sizes[size];
  
  return (
    <div 
      style={{
        width: currentSize,
        height: currentSize,
        background: '#E89923',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        flexShrink: 0,
        boxShadow: '0 4px 20px rgba(232, 153, 35, 0.4)'
      }}
    >
      <span style={{
        color: 'white',
        fontSize: currentSize * 0.45 + 'px',
        fontWeight: 900,
        letterSpacing: '-3px',
        fontFamily: 'Arial Black, sans-serif',
        marginLeft: '-8px'
      }}>
        hub
      </span>
      
      {/* Точная копия иконки с вашего логотипа */}
      <svg 
        viewBox="0 0 40 40" 
        style={{ 
          position: 'absolute',
          right: -currentSize * 0.05,
          bottom: -currentSize * 0.05,
          width: currentSize * 0.45,
          height: currentSize * 0.45
        }}
      >
        {/* Верхняя изогнутая часть */}
        <path 
          d="M 8 12 Q 8 8, 12 8 L 24 8 Q 28 8, 28 12 L 28 14 L 26 16 L 10 16 L 8 14 Z" 
          fill="#2a2a2a" 
          stroke="none"
        />
        
        {/* Основной корпус */}
        <rect x="8" y="16" width="20" height="18" fill="#2a2a2a" />
        
        {/* Правая панель с кнопками */}
        <rect x="24" y="16" width="4" height="18" fill="#2a2a2a" />
        
        {/* Кнопки справа */}
        <rect x="25" y="18" width="2" height="3" rx="1" fill="#E89923" />
        <rect x="25" y="22" width="2" height="3" rx="1" fill="#E89923" />
        <rect x="25" y="28" width="2" height="5" rx="1" fill="#E89923" />
        
        {/* Нижняя изогнутая часть - отсек выдачи */}
        <path 
          d="M 8 28 L 8 32 Q 8 34, 10 34 L 22 34 Q 24 34, 24 32 L 24 28 Z" 
          fill="#2a2a2a"
        />
        <rect x="12" y="30" width="8" height="2" rx="1" fill="#E89923" />
      </svg>
    </div>
  );
};
const Icons = {
  Coffee: () => <span>☕</span>,
  Droplets: () => <span>💧</span>,
  Clock: () => <span>🕐</span>,
  Phone: () => <span>📞</span>,
  Mail: () => <span>✉️</span>,
  MapPin: () => <span>📍</span>,
  Menu: () => <span>☰</span>,
  X: () => <span>✖️</span>,
  Sun: () => <span>☀️</span>,
  Moon: () => <span>🌙</span>,
  Globe: () => <span>🌍</span>,
  TrendingUp: () => <span>📈</span>,
  Users: () => <span>👥</span>,
  Package: () => <span>📦</span>,
  Check: () => <span>✓</span>,
  Star: () => <span>⭐</span>,
  BarChart3: () => <span>📊</span>,
  Settings: () => <span>⚙️</span>,
  FileText: () => <span>📄</span>,
  Map: () => <span>🗺️</span>,
  MessageSquare: () => <span>💬</span>,
  LogOut: () => <span>🚪</span>,
  Camera: () => <span>📷</span>,
};

// Анимированная вендинговая машина
const VendingMachine = ({ type = "coffee" }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDispensing, setIsDispensing] = useState(false);
  
  const handleItemClick = (index) => {
    setSelectedItem(index);
    setTimeout(() => {
      setIsDispensing(true);
      setTimeout(() => {
        setIsDispensing(false);
        setSelectedItem(null);
      }, 2000);
    }, 500);
  };
  
  const isCoffee = type === "coffee";
  
  return (
    <div className="vending-machine" style={{
      background: 'linear-gradient(to bottom, #1a1a1a 0%, #0a0a0a 100%)',
      border: '2px solid #333',
    }}>
      {/* Камера наверху */}
      <div style={{
        position: 'absolute',
        top: '-25px',
        right: '30px',
        width: '50px',
        height: '50px',
        background: '#2a2a2a',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 5px 15px rgba(0,0,0,0.5)'
      }}>
        <div style={{
          width: '25px',
          height: '25px',
          background: '#000',
          borderRadius: '50%',
          border: '3px solid #444'
        }}>
          <div style={{
            width: '5px',
            height: '5px',
            background: '#f00',
            borderRadius: '50%',
            margin: '3px',
            animation: 'blink 2s infinite'
          }}></div>
        </div>
      </div>
      
      {/* Логотип hub сверху */}
      <div style={{
        padding: '20px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <HubLogo size="small" />
      </div>
      
      {/* Экран */}
      <div style={{
        margin: '0 20px 20px',
        height: '320px',
        background: '#000',
        borderRadius: '15px',
        padding: '15px',
        position: 'relative',
        overflow: 'hidden',
        border: '3px solid #222',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
      }}>
        {/* Сетка напитков */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          height: '100%'
        }}>
          {[...Array(9)].map((_, i) => (
            <div 
              key={i} 
              onClick={() => handleItemClick(i)}
              style={{
                background: selectedItem === i 
                  ? 'linear-gradient(135deg, #E89923 0%, #f39c12 100%)' 
                  : 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: selectedItem === i ? '2px solid #E89923' : '2px solid #333',
                cursor: 'pointer',
                transition: 'all 0.3s',
                transform: selectedItem === i ? 'scale(0.95)' : 'scale(1)',
                boxShadow: selectedItem === i 
                  ? 'inset 0 2px 5px rgba(0,0,0,0.3)' 
                  : '0 2px 5px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => {
                if (selectedItem !== i) {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.border = '2px solid #E89923';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedItem !== i) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.border = '2px solid #333';
                }
              }}
            >
              <div style={{
                fontSize: '2rem',
                marginBottom: '5px',
                filter: selectedItem === i ? 'brightness(0) invert(1)' : 'none'
              }}>
                {isCoffee ? ['☕', '☕', '☕', '🥛', '🍫', '☕', '☕', '🍵', '☕'][i] : '🥤'}
              </div>
              <div style={{
                fontSize: '0.65rem',
                color: selectedItem === i ? '#fff' : '#999',
                textAlign: 'center',
                fontWeight: 600
              }}>
                {isCoffee 
                  ? ['Эспрессо', 'Американо', 'Капучино', 'Латте', 'Мокко', 'Флэт Уайт', 'Макиато', 'Чай', 'Какао'][i]
                  : ['Cola', 'Fanta', 'Sprite', 'Сок', 'Энергетик', 'Вода', 'Ice Tea', 'Лимонад', 'Кофе'][i]
                }
              </div>
              <div style={{
                fontSize: '0.55rem',
                color: selectedItem === i ? '#fff' : '#666',
                marginTop: '3px'
              }}>
                {isCoffee 
                  ? ['8000', '8000', '13000', '15000', '17000', '13000', '12000', '6000', '15000'][i]
                  : ['8000', '8000', '8000', '10000', '12000', '3000', '12000', '9000', '18000'][i]
                } сум
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Панель оплаты */}
      <div style={{
        margin: '0 20px 20px',
        padding: '20px',
        background: 'linear-gradient(to bottom, #2a2a2a 0%, #1a1a1a 100%)',
        borderRadius: '15px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        border: '2px solid #333',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
      }}>
        {[
          { icon: '💳', text: 'КАРТА' },
          { icon: '💵', text: 'НАЛИЧНЫЕ' },
          { icon: '📱', text: 'QR/NFC' }
        ].map((item, i) => (
          <div key={i} style={{ 
            textAlign: 'center',
            padding: '10px',
            borderRadius: '10px',
            background: 'rgba(232, 153, 35, 0.1)',
            border: '1px solid rgba(232, 153, 35, 0.3)',
            minWidth: '80px'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '5px' }}>{item.icon}</div>
            <div style={{ fontSize: '0.6rem', color: '#E89923', marginTop: '5px', fontWeight: 700, letterSpacing: '1px' }}>
              {item.text}
            </div>
          </div>
        ))}
      </div>
      
      {/* Отсек выдачи */}
      <div className="machine-dispenser" style={{
        background: 'linear-gradient(to bottom, #0a0a0a 0%, #000 100%)',
        boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.8)',
        border: '2px solid #222',
        overflow: 'hidden'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Анимация выдачи */}
          {isDispensing && (
            <div style={{
              position: 'absolute',
              top: '-50px',
              animation: 'drop 2s ease-in-out',
              fontSize: '3rem'
            }}>
              {isCoffee ? '☕' : '🥤'}
            </div>
          )}
          
          <div style={{
            fontSize: '0.9rem',
            color: '#666',
            letterSpacing: '3px',
            fontWeight: 700,
            textTransform: 'uppercase'
          }}>
            Push
          </div>
        </div>
      </div>
      
      {/* Текст снизу */}
      <div style={{
        position: 'absolute',
        bottom: '15px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#E89923',
        fontSize: '1rem',
        letterSpacing: '3px',
        fontWeight: 800,
        textTransform: 'uppercase'
      }}>
        Coffee \ Drinks
      </div>
      
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes drop {
          0% {
            top: -50px;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            top: 50%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState("ru");
  const [showMenu, setShowMenu] = useState(null);

  // Данные сайта с обновленными продуктами и ценами
  const siteData = {
    news: [
      {
        id: 1,
        title: {
          ru: "Новая локация в Центральном парке",
          uz: "Markaziy bog'da yangi joylashuv",
        },
        text: {
          ru: "Установлен новый автомат Ice Drink с 54 видами холодных напитков",
          uz: "54 xil sovuq ichimlikli yangi Ice Drink avtomati o'rnatildi",
        },
        date: "2024-03-15",
        image: "🥤",
      },
      {
        id: 2,
        title: {
          ru: "Круглосуточная работа в IT Park",
          uz: "IT Parkda tunu-kun ishlash",
        },
        text: {
          ru: "Теперь наш автомат в IT Park работает 24/7",
          uz: "Endi IT Parkdagi avtomatimiz 24/7 ishlaydi",
        },
        date: "2024-03-10",
        image: "🌙",
      },
      {
        id: 3,
        title: {
          ru: "Новые вкусы в меню",
          uz: "Menyuda yangi ta'mlar",
        },
        text: {
          ru: "Добавлены Flat White и новые виды чая",
          uz: "Flat White va yangi choy turlari qo'shildi",
        },
        date: "2024-03-05",
        image: "☕",
      },
    ],
    machines: {
      coffee: {
        name: { ru: "hub Coffee Machine", uz: "hub Qahva Mashinasi" },
        description: {
          ru: "Современный кофейный автомат с большим сенсорным экраном. Готовит премиальный кофе из свежеобжаренных зерен за 30 секунд. Оснащен системой безналичной оплаты и камерой видеонаблюдения.",
          uz: "Katta sensorli ekranli zamonaviy qahva avtomati. 30 soniyada yangi qovurilgan donlardan premium qahva tayyorlaydi. Naqdsiz to'lov tizimi va videokuzatuv kamerasi bilan jihozlangan.",
        },
        specs: {
          screen: {
            ru: "21.5\" сенсорный экран Full HD",
            uz: "21.5\" Full HD sensorli ekran",
          },
          size: { 
            ru: "Размеры: 183×60×80 см", 
            uz: "O'lchamlari: 183×60×80 sm" 
          },
          capacity: {
            ru: "600+ чашек без обслуживания",
            uz: "600+ piyola xizmatsiz",
          },
          payment: {
            ru: "Наличные, карты, Click, Payme",
            uz: "Naqd, karta, Click, Payme",
          },
        },
        products: [
          {
            id: "esp",
            name: { ru: "Эспрессо", uz: "Espresso" },
            price: 8000,
            volume: "30 мл",
            description: {
              ru: "Классический итальянский эспрессо",
              uz: "Klassik italyan espresso",
            },
            icon: "☕",
          },
          {
            id: "am",
            name: { ru: "Американо", uz: "Amerikano" },
            price: 8000,
            volume: "200 мл",
            description: {
              ru: "Эспрессо с горячей водой",
              uz: "Issiq suvli espresso",
            },
            icon: "☕",
          },
          {
            id: "cap",
            name: { ru: "Капучино", uz: "Kapuchino" },
            price: 13000,
            volume: "200 мл",
            description: {
              ru: "Эспрессо с молочной пенкой",
              uz: "Sutli ko'pikli espresso",
            },
            icon: "☕",
          },
          {
            id: "lat",
            name: { ru: "Латте", uz: "Latte" },
            price: 15000,
            volume: "300 мл",
            description: {
              ru: "Кофе с большим количеством молока",
              uz: "Ko'p sutli qahva",
            },
            icon: "☕",
          },
          {
            id: "flat",
            name: { ru: "Флэт Уайт", uz: "Flat White" },
            price: 13000,
            volume: "200 мл",
            description: {
              ru: "Двойной эспрессо с молоком",
              uz: "Ikki martalik espresso sut bilan",
            },
            icon: "☕",
          },
          {
            id: "moc",
            name: { ru: "Мокко", uz: "Mokko" },
            price: 17000,
            volume: "250 мл",
            description: {
              ru: "Кофе с шоколадом и молоком",
              uz: "Shokolad va sutli qahva",
            },
            icon: "☕",
          },
          {
            id: "choc",
            name: { ru: "Горячий шоколад", uz: "Issiq shokolad" },
            price: 15000,
            volume: "200 мл",
            description: {
              ru: "Насыщенный шоколадный напиток",
              uz: "To'yingan shokoladli ichimlik",
            },
            icon: "🍫",
          },
          {
            id: "tea",
            name: { ru: "Чай (черный/зеленый)", uz: "Choy (qora/yashil)" },
            price: 6000,
            volume: "300 мл",
            description: {
              ru: "Ароматный чай на выбор",
              uz: "Tanlash uchun xushbo'y choy",
            },
            icon: "🍵",
          },
        ],
      },
      iceDrink: {
        name: {
          ru: "hub Ice Drink Machine",
          uz: "hub Sovuq Ichimlik Mashinasi",
        },
        description: {
          ru: "Инновационный автомат холодных напитков с 54 видами напитков. Большой 55-дюймовый интерактивный дисплей. Идеально для жаркого климата Ташкента.",
          uz: "54 xil ichimlikli innovatsion sovuq ichimlik avtomati. Katta 55 dyuymli interaktiv displey. Toshkentning issiq iqlimi uchun ideal.",
        },
        specs: {
          screen: {
            ru: '55" интерактивный дисплей',
            uz: '55" interaktiv displey',
          },
          size: { 
            ru: "Размеры: 200×90×85 см", 
            uz: "O'lchamlari: 200×90×85 sm" 
          },
          capacity: { 
            ru: "54 вида напитков", 
            uz: "54 xil ichimlik" 
          },
          payment: { 
            ru: "Все виды платежей + QR", 
            uz: "Barcha to'lov turlari + QR" 
          },
        },
        products: [
          {
            id: "cola05",
            name: { ru: "Coca-Cola Classic", uz: "Coca-Cola Classic" },
            price: 8000,
            volume: "0.5 л",
            type: "Газированный",
            icon: "🥤",
          },
          {
            id: "fanta05",
            name: { ru: "Fanta", uz: "Fanta" },
            price: 8000,
            volume: "0.5 л",
            type: "Газированный",
            icon: "🍊",
          },
          {
            id: "sprite05",
            name: { ru: "Sprite", uz: "Sprite" },
            price: 8000,
            volume: "0.5 л",
            type: "Газированный",
            icon: "🥤",
          },
          {
            id: "pepsi05",
            name: { ru: "Pepsi", uz: "Pepsi" },
            price: 8000,
            volume: "0.5 л",
            type: "Газированный",
            icon: "🥤",
          },
          {
            id: "flashup",
            name: { ru: "Flash Up Energy", uz: "Flash Up Energy" },
            price: 12000,
            volume: "0.45 л",
            type: "Энергетический",
            icon: "⚡",
          },
          {
            id: "redbull",
            name: { ru: "Red Bull", uz: "Red Bull" },
            price: 21000,
            volume: "0.25 л",
            type: "Энергетический",
            icon: "⚡",
          },
          {
            id: "litenergy",
            name: { ru: "Lit Energy", uz: "Lit Energy" },
            price: 17000,
            volume: "0.45 л",
            type: "Энергетический",
            icon: "⚡",
          },
          {
            id: "fresh148",
            name: { ru: "Fresh 148 Lemonade", uz: "Fresh 148 Limonad" },
            price: 9000,
            volume: "0.45 л",
            type: "Лимонад",
            icon: "🍋",
          },
          {
            id: "icetea",
            name: { ru: "Ice Tea (разные вкусы)", uz: "Ice Tea (turli ta'mlar)" },
            price: 12000,
            volume: "0.5 л",
            type: "Холодный чай",
            icon: "🧃",
          },
          {
            id: "dinay",
            name: { ru: "Dinay (соки)", uz: "Dinay (sharbatlar)" },
            price: 10000,
            volume: "1 л",
            type: "Сок",
            icon: "🧃",
          },
          {
            id: "water",
            name: { ru: "Вода Hydrolife", uz: "Hydrolife suvi" },
            price: 3000,
            volume: "0.5 л",
            type: "Вода",
            icon: "💧",
          },
        ],
      },
    },
    locations: [
      {
        id: 1,
        name: "American Hospital",
        address: { 
          ru: "ул. Талабалар шахарчаси, 1", 
          uz: "Talabalar shaharchasi ko'chasi, 1" 
        },
        type: "coffee",
        distance: null,
        coordinates: { lat: 41.3389, lng: 69.3347 },
        workingHours: "08:00 - 20:00",
        status: "working",
      },
      {
        id: 2,
        name: "Кардиология - КПП",
        address: {
          ru: "Чиланзарский р-н, ул. Мукими",
          uz: "Chilonzor t., Muqimiy ko'chasi",
        },
        type: "coffee",
        distance: null,
        coordinates: { lat: 41.2744, lng: 69.2047 },
        workingHours: "24/7",
        status: "working",
      },
      {
        id: 3,
        name: "Istanbul City - Parking",
        address: { 
          ru: "Юнусабадский р-н, ул. Амир Темур", 
          uz: "Yunusobod t., Amir Temur ko'chasi" 
        },
        type: "both",
        distance: null,
        coordinates: { lat: 41.3572, lng: 69.2869 },
        workingHours: "10:00 - 23:00",
        status: "working",
      },
      {
        id: 4,
        name: "IT Park Tashkent",
        address: { 
          ru: "ул. Мурабек, 5", 
          uz: "Murabek ko'chasi, 5" 
        },
        type: "coffee",
        distance: null,
        coordinates: { lat: 41.3736, lng: 69.2881 },
        workingHours: "24/7",
        status: "working",
      },
      {
        id: 5,
        name: "QudratMarket",
        address: { 
          ru: "Сергелийский р-н", 
          uz: "Sergeli tumani" 
        },
        type: "iceDrink",
        distance: null,
        coordinates: { lat: 41.2234, lng: 69.2194 },
        workingHours: "08:00 - 22:00",
        status: "working",
      },
      {
        id: 6,
        name: "Margilon 2x1",
        address: { 
          ru: "Яшнабадский р-н", 
          uz: "Yashnobod tumani" 
        },
        type: "coffee",
        distance: null,
        coordinates: { lat: 41.2856, lng: 69.3247 },
        workingHours: "09:00 - 21:00",
        status: "working",
      },
      {
        id: 7,
        name: "Лес - Парковка",
        address: { 
          ru: "Мирабадский р-н, ул. Фидокор", 
          uz: "Mirobod t., Fidokor ko'chasi" 
        },
        type: "both",
        distance: null,
        coordinates: { lat: 41.3011, lng: 69.2739 },
        workingHours: "24/7",
        status: "working",
      },
    ],
    promotions: [
      {
        id: 1,
        title: { ru: "Программа лояльности HUB+", uz: "HUB+ sodiqlik dasturi" },
        description: {
          ru: "5% кешбэк на накопительный счет. Оплачивайте QR-платежом и отслеживайте баланс в Telegram боте",
          uz: "Jamg'arma hisobiga 5% keshbek. QR-to'lov qiling va Telegram botda balansni kuzating",
        },
        active: true,
      },
      {
        id: 2,
        title: { ru: "Корпоративное обслуживание", uz: "Korporativ xizmat" },
        description: {
          ru: "Специальные условия для офисов и бизнес-центров",
          uz: "Ofislar va biznes markazlar uchun maxsus shartlar",
        },
        active: true,
      },
    ],
    contacts: {
      phone: "+998 71 120 39 99",
      email: "info@vendinghub.uz",
      address: {
        ru: "г. Ташкент, ул. 1 пр. Шохимардон, 17",
        uz: "Toshkent sh., 1-pr. Shohimardon ko'chasi, 17",
      },
      workHours: { ru: "Круглосуточно 24/7", uz: "Tunu-kun 24/7" },
    },
    texts: {
      heroTitle: {
        ru: "Вкусный кофе рядом с вами",
        uz: "Sizning yoningizda mazali qahva",
      },
      heroSubtitle: {
        ru: "Премиальные напитки из автоматов нового поколения. Работаем 24/7",
        uz: "Yangi avlod avtomatlaridan premium ichimliklar. 24/7 ishlaymiz",
      },
    },
  };

  const t = (obj) => obj[language] || obj.ru || obj;

  // Навигация
  const navigation = [
    { id: "home", name: { ru: "Главная", uz: "Bosh sahifa" } },
    { id: "machines", name: { ru: "Автоматы", uz: "Avtomatlar" } },
    { id: "locations", name: { ru: "Локации", uz: "Joylashuvlar" } },
    { id: "partnership", name: { ru: "Партнерство", uz: "Hamkorlik" } },
    { id: "contacts", name: { ru: "Контакты", uz: "Kontaktlar" } },
  ];

  // Главная страница
  const HomePage = () => (
    <div className={`page ${isDarkMode ? "dark" : ""}`}>
      <section className="hero">
        <div className="hero-content">
          <h1>{t(siteData.texts.heroTitle)}</h1>
          <p>{t(siteData.texts.heroSubtitle)}</p>
          <div className="hero-buttons">
            <button
              onClick={() => setCurrentPage("locations")}
              className="btn-primary"
            >
              <Icons.MapPin />{" "}
              {language === "ru" ? "Найти автомат" : "Avtomat topish"}
            </button>
            <button
              onClick={() => setCurrentPage("machines")}
              className="btn-secondary"
            >
              {language === "ru" ? "Меню напитков" : "Ichimliklar menyusi"}
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <VendingMachine type="coffee" />
        </div>
      </section>

      <section className="stats">
        <div className="stat">
          <Icons.MapPin />
          <h3>10+</h3>
          <p>{language === "ru" ? "Локаций" : "Joylashuvlar"}</p>
        </div>
        <div className="stat">
          <Icons.Coffee />
          <h3>15+</h3>
          <p>{language === "ru" ? "Автоматов" : "Avtomatlar"}</p>
        </div>
        <div className="stat">
          <Icons.Package />
          <h3>40+</h3>
          <p>{language === "ru" ? "Видов напитков" : "Ichimlik turlari"}</p>
        </div>
        <div className="stat">
          <Icons.Clock />
          <h3>24/7</h3>
          <p>{language === "ru" ? "Работаем" : "Ishlaymiz"}</p>
        </div>
      </section>

      <section className="promotions">
        <h2>
          {language === "ru" ? "Преимущества hub" : "hub afzalliklari"}
        </h2>
        <div className="promo-grid">
          {siteData.promotions.map((promo) => (
            <div key={promo.id} className="promo-card">
              <h3>{t(promo.title)}</h3>
              <p>{t(promo.description)}</p>
              <span className="promo-badge">
                {promo.id === 1 ? '💰 5%' : '🏢'}
              </span>
            </div>
          ))}
          <div className="promo-card" style={{ background: '#2a2a2a' }}>
            <h3>{language === "ru" ? "Telegram Bot" : "Telegram Bot"}</h3>
            <p>{language === "ru" 
              ? "Отслеживайте баланс и историю покупок в удобном боте" 
              : "Balans va xaridlar tarixini qulay botda kuzating"}</p>
            <span className="promo-badge">🤖</span>
          </div>
        </div>
      </section>

      <section className="news">
        <h2>{language === "ru" ? "Новости" : "Yangiliklar"}</h2>
        <div className="news-grid">
          {siteData.news.map((item) => (
            <div key={item.id} className="news-card">
              <div className="news-image">{item.image}</div>
              <h3>{t(item.title)}</h3>
              <p>{t(item.text)}</p>
              <small>{item.date}</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  // Страница автоматов
  const MachinesPage = () => (
    <div className={`page ${isDarkMode ? "dark" : ""}`}>
      <h1>{language === "ru" ? "Наши автоматы" : "Bizning avtomatlar"}</h1>

      <div className="machine-card">
        <div className="machine-header">
          <div className="machine-icon">☕</div>
          <h2>{t(siteData.machines.coffee.name)}</h2>
        </div>
        
        <div className="machine-visual">
          <VendingMachine type="coffee" />
        </div>
        
        <p className="machine-description">
          {t(siteData.machines.coffee.description)}
        </p>

        <div className="machine-specs">
          <div className="spec">
            <span className="spec-icon">📺</span>
            <span>{t(siteData.machines.coffee.specs.screen)}</span>
          </div>
          <div className="spec">
            <span className="spec-icon">📏</span>
            <span>{t(siteData.machines.coffee.specs.size)}</span>
          </div>
          <div className="spec">
            <span className="spec-icon">☕</span>
            <span>{t(siteData.machines.coffee.specs.capacity)}</span>
          </div>
          <div className="spec">
            <span className="spec-icon">💳</span>
            <span>{t(siteData.machines.coffee.specs.payment)}</span>
          </div>
        </div>

        <h3>{language === "ru" ? "Меню и цены:" : "Menyu va narxlar:"}</h3>
        <div className="products">
          {siteData.machines.coffee.products.map((product) => (
            <div key={product.id} className="product-with-desc">
              <div className="product-icon">{product.icon}</div>
              <div className="product-content">
                <div className="product-header">
                  <span className="product-name">
                    {t(product.name)} ({product.volume})
                  </span>
                  <span className="price">
                    {product.price.toLocaleString()}{" "}
                    {language === "ru" ? "сум" : "so'm"}
                  </span>
                </div>
                <p className="product-desc">{t(product.description)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="machine-card">
        <div className="machine-header">
          <div className="machine-icon">🥤</div>
          <h2>{t(siteData.machines.iceDrink.name)}</h2>
        </div>
        
        <div className="machine-visual">
          <VendingMachine type="ice" />
        </div>
        
        <p className="machine-description">
          {t(siteData.machines.iceDrink.description)}
        </p>

        <div className="machine-specs">
          <div className="spec">
            <span className="spec-icon">📺</span>
            <span>{t(siteData.machines.iceDrink.specs.screen)}</span>
          </div>
          <div className="spec">
            <span className="spec-icon">📏</span>
            <span>{t(siteData.machines.iceDrink.specs.size)}</span>
          </div>
          <div className="spec">
            <span className="spec-icon">🥤</span>
            <span>{t(siteData.machines.iceDrink.specs.capacity)}</span>
          </div>
          <div className="spec">
            <span className="spec-icon">💳</span>
            <span>{t(siteData.machines.iceDrink.specs.payment)}</span>
          </div>
        </div>

        <h3>
          {language === "ru" ? "Популярные напитки:" : "Mashhur ichimliklar:"}
        </h3>
        <div className="products">
          {siteData.machines.iceDrink.products.map((product) => (
            <div key={product.id} className="product-with-desc">
              <div className="product-icon">{product.icon}</div>
              <div className="product-content">
                <div className="product-header">
                  <span className="product-name">
                    {t(product.name)} ({product.volume})
                  </span>
                  <span className="price">
                    {product.price.toLocaleString()}{" "}
                    {language === "ru" ? "сум" : "so'm"}
                  </span>
                </div>
                <p className="product-desc">{product.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Страница локаций с картой
  const LocationsPage = () => {
    const [sortedLocations, setSortedLocations] = useState(siteData.locations);
    const [isSearching, setIsSearching] = useState(false);
    const [filterType, setFilterType] = useState("all");

    // Функция расчета расстояния
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371;
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    // Определение ближайших автоматов
    const findNearestLocations = () => {
      setIsSearching(true);

      setTimeout(() => {
        const userLat = 41.3111 + (Math.random() - 0.5) * 0.1;
        const userLng = 69.2797 + (Math.random() - 0.5) * 0.1;

        const locationsWithDistance = siteData.locations.map((loc) => ({
          ...loc,
          distance: calculateDistance(
            userLat,
            userLng,
            loc.coordinates.lat,
            loc.coordinates.lng
          ).toFixed(1),
        }));

        const sorted = [...locationsWithDistance].sort(
          (a, b) => a.distance - b.distance
        );
        setSortedLocations(sorted);
        setIsSearching(false);

        const nearest = sorted[0];
        alert(
          language === "ru"
            ? `Ближайший автомат всего в ${nearest.distance} км от вас!\n${nearest.name}`
            : `Eng yaqin avtomat atigi ${nearest.distance} km uzoqlikda!\n${nearest.name}`
        );
      }, 1500);
    };

    // Фильтрация по типу
    const filteredLocations = sortedLocations.filter((loc) => {
      if (filterType === "all") return true;
      return loc.type === filterType || loc.type === "both";
    });

    // Модальное окно с меню
    const MenuModal = ({ location, onClose }) => {
      if (!location) return null;

      const availableMachines = [];
      if (location.type === "coffee" || location.type === "both") {
        availableMachines.push("coffee");
      }
      if (location.type === "iceDrink" || location.type === "both") {
        availableMachines.push("iceDrink");
      }

      return (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>{location.name}</h2>
                <p className="location-subtitle">
                  <Icons.MapPin /> {t(location.address)}
                  {location.distance && (
                    <span>
                      {" "}
                      • {location.distance} {language === "ru" ? "км" : "km"}
                    </span>
                  )}
                </p>
              </div>
              <button onClick={onClose} className="close-btn">
                ✖️
              </button>
            </div>

            <div className="modal-body">
              <div className="location-details">
                <div className="detail-item">
                  <Icons.Clock />
                  <span>
                    {language === "ru" ? "Время работы:" : "Ish vaqti:"}{" "}
                    {location.workingHours}
                  </span>
                </div>
                <div className="detail-item">
                  <span className={`status ${location.status}`}>
                    {location.status === "working"
                      ? language === "ru"
                        ? "🟢 Работает"
                        : "🟢 Ishlayapti"
                      : language === "ru"
                      ? "🔧 Обслуживание"
                      : "🔧 Xizmat ko'rsatish"}
                  </span>
                </div>
              </div>

              {availableMachines.map((machineType) => (
                <div key={machineType} className="machine-menu">
                  <div className="machine-menu-header">
                    <h3>
                      {machineType === "coffee" ? "☕ " : "🥤 "}
                      {t(siteData.machines[machineType].name)}
                    </h3>
                    <span className="product-count">
                      {siteData.machines[machineType].products.length}{" "}
                      {language === "ru" ? "напитков" : "ichimlik"}
                    </span>
                  </div>
                  <div className="menu-products">
                    {siteData.machines[machineType].products.map((product) => (
                      <div key={product.id} className="menu-item">
                        <div className="menu-item-icon">{product.icon}</div>
                        <div className="menu-item-content">
                          <div className="menu-item-header">
                            <span className="menu-item-name">
                              {t(product.name)}
                              {product.volume && ` (${product.volume})`}
                            </span>
                            <span className="menu-item-price">
                              {product.price.toLocaleString()}{" "}
                              {language === "ru" ? "сум" : "so'm"}
                            </span>
                          </div>
                          <p className="menu-item-desc">
                            {product.description
                              ? t(product.description)
                              : product.type || ""}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="modal-footer">
                <p className="payment-info">
                  💳{" "}
                  {language === "ru"
                    ? "Принимаем: наличные, карты, Click, Payme"
                    : "Qabul qilamiz: naqd, kartalar, Click, Payme"}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className={`page ${isDarkMode ? "dark" : ""}`}>
        <h1>{language === "ru" ? "Наши локации" : "Bizning joylashuvlar"}</h1>

        <div className="locations-container">
          {/* Карта */}
          <div className="map-container">
            <div className="map-placeholder">
              <div className="map-text">
                {language === "ru"
                  ? "🗺️ Интерактивная карта с локациями"
                  : "🗺️ Joylashuvlar bilan interaktiv xarita"}
              </div>
            </div>
          </div>

          <div className="location-controls">
            <button
              onClick={findNearestLocations}
              className="btn-primary find-nearest"
              disabled={isSearching}
            >
              <Icons.MapPin />
              {isSearching
                ? language === "ru"
                  ? "📍 Определяем местоположение..."
                  : "📍 Joylashuvni aniqlamoqda..."
                : language === "ru"
                ? "Найти ближайшие автоматы"
                : "Eng yaqin avtomatlarni topish"}
            </button>

            <div className="filter-buttons">
              <button
                onClick={() => setFilterType("all")}
                className={`filter-btn ${filterType === "all" ? "active" : ""}`}
              >
                {language === "ru" ? "Все" : "Hammasi"}
              </button>
              <button
                onClick={() => setFilterType("coffee")}
                className={`filter-btn ${
                  filterType === "coffee" ? "active" : ""
                }`}
              >
                ☕ {language === "ru" ? "Кофе" : "Qahva"}
              </button>
              <button
                onClick={() => setFilterType("iceDrink")}
                className={`filter-btn ${
                  filterType === "iceDrink" ? "active" : ""
                }`}
              >
                🥤 Ice Drink
              </button>
            </div>
          </div>

          <div className="locations-grid">
            {filteredLocations.map((location, index) => (
              <div
                key={location.id}
                className={`location-card ${
                  location.status === "maintenance" ? "maintenance" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="location-status">
                  {location.status === "working" ? "🟢" : "🔧"}
                </div>

                <div className="location-info">
                  <h3>{location.name}</h3>
                  <p className="address">
                    <Icons.MapPin /> {t(location.address)}
                  </p>
                  <p className="hours">
                    <Icons.Clock /> {location.workingHours}
                  </p>

                  {location.distance && (
                    <div className="distance-badge">
                      <span className="distance-number">{location.distance}</span>
                      <span className="distance-unit">
                        {language === "ru" ? "км" : "km"}
                      </span>
                    </div>
                  )}

                  <div className="location-types">
                    {(location.type === "coffee" || location.type === "both") && (
                      <span className="type-badge coffee">
                        ☕ {language === "ru" ? "Кофе" : "Qahva"}
                      </span>
                    )}
                    {(location.type === "iceDrink" ||
                      location.type === "both") && (
                      <span className="type-badge ice">🥤 Ice Drink</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setShowMenu(location)}
                  className="view-menu-btn"
                  disabled={location.status === "maintenance"}
                >
                  {location.status === "maintenance"
                    ? language === "ru"
                      ? "Временно недоступен"
                      : "Vaqtincha mavjud emas"
                    : language === "ru"
                    ? "Посмотреть меню"
                    : "Menyuni ko'rish"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {showMenu && (
          <MenuModal location={showMenu} onClose={() => setShowMenu(null)} />
        )}
      </div>
    );
  };

  // Страница партнерства
  const PartnershipPage = () => (
    <div className={`page ${isDarkMode ? "dark" : ""}`}>
      <h1>{language === "ru" ? "Партнерство" : "Hamkorlik"}</h1>

      <div className="partnership-grid">
        <div className="partnership-card">
          <div className="partnership-icon">
            <Icons.TrendingUp />
          </div>
          <h2>{language === "ru" ? "Инвесторам" : "Investorlar uchun"}</h2>
          <p className="partnership-desc">
            {language === "ru"
              ? "Инвестируйте в перспективный бизнес вендинговых автоматов"
              : "Istiqbolli vending avtomatlari biznesiga sarmoya kiriting"}
          </p>

          <div className="partnership-features">
            <div className="feature">
              <h3>
                {language === "ru"
                  ? "Минимальные инвестиции"
                  : "Minimal investitsiya"}
              </h3>
              <p className="feature-value">
                {language === "ru" ? "от 10 млн сум" : "10 mln so'mdan"}
              </p>
            </div>
            <div className="feature">
              <h3>{language === "ru" ? "Ваш доход" : "Sizning daromadingiz"}</h3>
              <p className="feature-value">
                70% {language === "ru" ? "от чистой прибыли" : "sof foydadan"}
              </p>
            </div>
            <div className="feature">
              <h3>{language === "ru" ? "Наши услуги" : "Bizning xizmatlar"}</h3>
              <p className="feature-value" style={{ fontSize: '1.2rem' }}>
                30% {language === "ru" ? "администрирование" : "boshqaruv"}
              </p>
            </div>
          </div>

          <button className="btn-primary">
            {language === "ru" ? "Стать инвестором" : "Investor bo'lish"}
          </button>
        </div>

        <div className="partnership-card">
          <div className="partnership-icon">
            <Icons.Package />
          </div>
          <h2>
            {language === "ru" ? "Поставщикам" : "Yetkazib beruvchilar uchun"}
          </h2>
          <p className="partnership-desc">
            {language === "ru"
              ? "Станьте поставщиком качественных продуктов для наших автоматов"
              : "Avtomatlarimiz uchun sifatli mahsulot yetkazib beruvchi bo'ling"}
          </p>

          <div className="partnership-requirements">
            <h3>{language === "ru" ? "Что нам нужно:" : "Bizga kerak:"}</h3>
            <ul>
              <li>
                <Icons.Coffee />
                {language === "ru"
                  ? "Кофе зерновой премиум класса"
                  : "Premium sinf donali qahva"}
              </li>
              <li>
                <Icons.Droplets />
                {language === "ru"
                  ? "Смеси для вендинга (молоко, какао, шоколад)"
                  : "Vending aralashmalari (sut, kakao, shokolad)"}
              </li>
              <li>
                <Icons.Package />
                {language === "ru"
                  ? "Стаканы и расходные материалы"
                  : "Stakanlar va sarflanadigan materiallar"}
              </li>
              <li>
                <Icons.Droplets />
                {language === "ru"
                  ? "Вода 18.9л, сиропы, напитки"
                  : "18.9l suv, siroplar, ichimliklar"}
              </li>
            </ul>
          </div>

          <button className="btn-primary">
            {language === "ru"
              ? "Стать поставщиком"
              : "Yetkazib beruvchi bo'lish"}
          </button>
        </div>
      </div>

      <div className="partnership-form">
        <h2>{language === "ru" ? "Оставить заявку" : "Ariza qoldirish"}</h2>
        <div className="form-grid">
          <input
            type="text"
            placeholder={language === "ru" ? "Ваше имя" : "Ismingiz"}
          />
          <input
            type="tel"
            placeholder={language === "ru" ? "Телефон" : "Telefon"}
          />
          <select>
            <option>
              {language === "ru" ? "Я инвестор" : "Men investorman"}
            </option>
            <option>
              {language === "ru" ? "Я поставщик" : "Men yetkazib beruvchiman"}
            </option>
          </select>
          <input type="email" placeholder="Email" />
        </div>
        <textarea
          placeholder={language === "ru" ? "Сообщение" : "Xabar"}
          rows="4"
        ></textarea>
        <button
          className="btn-primary"
          onClick={() =>
            alert(language === "ru" ? "Заявка отправлена!" : "Ariza yuborildi!")
          }
        >
          {language === "ru" ? "Отправить заявку" : "Ariza yuborish"}
        </button>
      </div>
    </div>
  );

  // Страница контактов
  const ContactsPage = () => (
    <div className={`page ${isDarkMode ? "dark" : ""}`}>
      <h1>{language === "ru" ? "Контакты" : "Kontaktlar"}</h1>

      <div className="contacts-content">
        <div className="contact-info">
          <h2>
            {language === "ru" ? "Свяжитесь с нами" : "Biz bilan bog'laning"}
          </h2>

          <div className="contact-item">
            <Icons.Phone />
            <div>
              <p>{language === "ru" ? "Телефон:" : "Telefon:"}</p>
              <a href={`tel:${siteData.contacts.phone}`}>
                {siteData.contacts.phone}
              </a>
            </div>
          </div>

          <div className="contact-item">
            <Icons.Mail />
            <div>
              <p>Email:</p>
              <a href={`mailto:${siteData.contacts.email}`}>
                {siteData.contacts.email}
              </a>
            </div>
          </div>

          <div className="contact-item">
            <Icons.MapPin />
            <div>
              <p>{language === "ru" ? "Адрес офиса:" : "Ofis manzili:"}</p>
              <p>{t(siteData.contacts.address)}</p>
            </div>
          </div>

          <div className="contact-item">
            <Icons.Clock />
            <div>
              <p>{language === "ru" ? "Режим работы:" : "Ish vaqti:"}</p>
              <p>{t(siteData.contacts.workHours)}</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>{language === "ru" ? "Напишите нам" : "Bizga yozing"}</h2>
          <input
            type="text"
            placeholder={language === "ru" ? "Ваше имя" : "Ismingiz"}
          />
          <input type="email" placeholder="Email" />
          <input
            type="tel"
            placeholder={language === "ru" ? "Телефон" : "Telefon"}
          />
          <textarea
            placeholder={language === "ru" ? "Сообщение" : "Xabar"}
            rows="4"
          ></textarea>
          <button
            onClick={() =>
              alert(
                language === "ru" ? "Сообщение отправлено!" : "Xabar yuborildi!"
              )
            }
            className="btn-primary"
          >
            {language === "ru" ? "Отправить" : "Yuborish"}
          </button>
        </div>
      </div>
    </div>
  );

  // Рендер страниц
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "machines":
        return <MachinesPage />;
      case "locations":
        return <LocationsPage />;
      case "partnership":
        return <PartnershipPage />;
      case "contacts":
        return <ContactsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
      <style>{styles}</style>
      
      {/* Шапка */}
      <header className="header">
        <div className="header-content">
          <div className="logo" onClick={() => setCurrentPage("home")}>
            <HubLogo size="medium" />
          </div>

          <nav className="desktop-nav">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={currentPage === item.id ? "active" : ""}
              >
                {t(item.name)}
              </button>
            ))}
          </nav>

          <div className="header-controls">
            <button
              onClick={() => setLanguage(language === "ru" ? "uz" : "ru")}
              className="lang-btn"
            >
              <Icons.Globe /> {language.toUpperCase()}
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="theme-btn"
            >
              {isDarkMode ? <Icons.Sun /> : <Icons.Moon />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="menu-btn"
            >
              {isMenuOpen ? <Icons.X /> : <Icons.Menu />}
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <nav className="mobile-menu">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMenuOpen(false);
                }}
                className={currentPage === item.id ? "active" : ""}
              >
                {t(item.name)}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Основной контент */}
      <main className="main">{renderPage()}</main>

      {/* Подвал */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo" style={{ marginBottom: '1rem' }}>
              <HubLogo size="medium" />
            </div>
            <p className="footer-desc">
              {language === "ru"
                ? "Премиальный кофе и напитки 24/7"
                : "Premium qahva va ichimliklar 24/7"}
            </p>
          </div>

          <div className="footer-section">
            <h4>{language === "ru" ? "Меню" : "Menyu"}</h4>
            <ul>
              {navigation.map((item) => (
                <li key={item.id}>
                  <button onClick={() => setCurrentPage(item.id)}>
                    {t(item.name)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>{language === "ru" ? "Контакты" : "Kontaktlar"}</h4>
            <ul>
              <li>{siteData.contacts.phone}</li>
              <li>{siteData.contacts.email}</li>
              <li>{t(siteData.contacts.address)}</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2024 hub.{" "}
            {language === "ru"
              ? "Все права защищены"
              : "Barcha huquqlar himoyalangan"}
          </p>
        </div>
      </footer>
    </div>
  );
}