import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../../../application/auth.store';
import { OrganizationSegment } from '../../../domain/model/organization-segment';

@Component({
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login implements OnInit {
  protected readonly store = inject(AuthStore);
  private readonly router = inject(Router);
  protected readonly email = signal('admin.constructora@roadwatch.demo');
  protected readonly password = signal('roadwatch');
  protected readonly selectedProfileId = signal('e-admin');

  ngOnInit(): void {
    this.store.loadDemoProfiles();
  }

  protected profilesFor(segment: OrganizationSegment) {
    return this.store.demoProfiles().filter((profile) => profile.segment === segment);
  }

  protected selectProfile(profileId: string): void {
    const profile = this.store.demoProfiles().find((item) => item.id === profileId);
    if (!profile) return;

    this.selectedProfileId.set(profile.id);
    this.email.set(profile.email);
    this.password.set(profile.password);
  }

  protected submit(): void {
    this.store.login(this.email(), this.password());
    setTimeout(() => {
      const user = this.store.user();
      if (!this.store.authenticated() || !user) return;
      this.router.navigateByUrl(
        user.organizationSegment === 'CONSTRUCTION_COMPANY' ? '/projects' : '/reports',
      );
    }, 0);
  }
}
