import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Card, CardModule } from 'primeng/card';
import axios from 'axios';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { ClipboardModule } from 'ngx-clipboard';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-link-creator',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CardModule,
    SharedModule,
    ButtonModule,
    InputTextModule,
    ClipboardModule,
  ],
  templateUrl: './link-creator.component.html',
  styleUrl: './link-creator.component.scss',
})
export class LinkCreatorComponent {
  constructor(private clipboard: ClipboardService) {}

  @Input() link: string = '';

  loading: boolean = false;
  shortLink: string = '';
  error: any = null;

  printLink() {
    console.log('Link: ', this.link);
  }

  onLinkChange(event: Event) {
    this.printLink();
  }

  reset() {
    this.link = '';
    this.shortLink = '';
    this.error = null;
  }

  copyLink() {
    console.log('Copying link: ', this.shortLink);
    this.clipboard.copyFromContent(this.shortLink);
  }

  shortenLink() {
    console.log('Shortening link: ', this.link);
    this.loading = true;

    // artificial delay
    setTimeout(() => {
      axios
        .post(
          'https://link.aizistral.com/api/create-link',
          {
            link: this.link,
          },
          {
            timeout: 2000,
          }
        )
        .then((response) => {
          console.log('Link created: ', response.data);
          this.shortLink = `https://link.aizistral.com/${response.data.id}`;
          this.link = '';
          this.loading = false;
        })
        .catch((error) => {
          console.error('Error creating link: ', error);
          this.link = '';
          this.error = error;
          this.loading = false;
        });
    }, 1000);
  }
}
