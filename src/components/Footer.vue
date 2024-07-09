<template>
  <footer>
    <div class="footer-content">
      <div class="footer-section">
        <img
          src="@/assets/logo-footer.png"
          alt="Petson Logo"
          class="footer-logo"
        />
        <p>petson.</p>
      </div>
      <div class="footer-section">
        <p>Petson</p>
        <ul>
          <li><a href="#">About us</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Store locator</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <p>Contact</p>
        <ul>
          <li><a href="mailto:contact@petson.com">contact@petson.com</a></li>
          <li>+385 000 000</li>
          <li>35 Shnauzer avenue, Dogville AL</li>
        </ul>
      </div>
      <div class="footer-section">
        <p>Information</p>
        <ul>
          <li><a href="#">Ordering and shipping</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">GDPR statement</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <p>
          If you can't find an answer to your question, please contact our
          <a href="#">customer service</a>.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
footer {
  background-color: #f7f9fa;
  padding: 20px 0;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: auto;
}

.footer-section {
  flex: 1;
  padding: 0 20px;
}

.footer-logo {
  width: 50px;
  height: auto;
  margin-bottom: 10px;
}

.footer-section p {
  font-weight: bold;
  margin-bottom: 10px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 5px;
}

.footer-section ul li a {
  text-decoration: none;
  color: #333;
}

.footer-section ul li a:hover {
  text-decoration: underline;
}

.footer-section:last-child p {
  font-weight: normal;
}
</style>
